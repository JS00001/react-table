import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { elementScroll, observeElementOffset, observeElementRect, useVirtualizer } from "@tanstack/react-virtual";

import type { TableRowData } from "@/types";
import type { VirtualizerOptions } from "@tanstack/react-virtual";

import { CompactTableViewSize } from "@/lib/const";

type TableVirtualizerOptions = VirtualizerOptions<HTMLElement, HTMLDivElement>;

type UseTableVirtualizationProps<DataType extends TableRowData> = {
  data: DataType[];
  isCompactView: boolean;
};

const useTableVirtualization = <DataType extends TableRowData>({
  data,
  isCompactView,
}: UseTableVirtualizationProps<DataType>) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [scrollMargin, setScrollMargin] = useState(0);
  const [scrollParent, setScrollParent] = useState<HTMLElement | null>(null);

  const getCompactView = () => {
    return window.matchMedia(`(max-width: ${CompactTableViewSize}px)`).matches;
  };

  const subscribeToCompactView = useCallback((onChange: () => void) => {
    const mediaQuery = window.matchMedia(`(max-width: ${CompactTableViewSize}px)`);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const isPageScrollElement = (element: HTMLElement) => {
    const ownerDocument = element.ownerDocument;
    return element === (ownerDocument.scrollingElement ?? ownerDocument.documentElement);
  };

  const findScrollParent = (element: HTMLElement) => {
    const ownerDocument = element.ownerDocument;
    const ownerWindow = ownerDocument.defaultView!;

    for (
      let parent = element.parentElement;
      parent && parent !== ownerDocument.documentElement;
      parent = parent.parentElement
    ) {
      const isScrollable = /(auto|scroll|overlay)/.test(ownerWindow.getComputedStyle(parent).overflowY);

      if (isScrollable && parent.scrollHeight > parent.clientHeight) {
        return parent;
      }
    }

    return (ownerDocument.scrollingElement ?? ownerDocument.documentElement) as HTMLElement;
  };

  const getTableBodyOffset = (tableBody: HTMLElement, scrollParent: HTMLElement) => {
    const bodyTop = tableBody.getBoundingClientRect().top;

    return isPageScrollElement(scrollParent)
      ? bodyTop + tableBody.ownerDocument.defaultView!.scrollY
      : bodyTop - scrollParent.getBoundingClientRect().top + scrollParent.scrollTop - scrollParent.clientTop;
  };

  const observeScrollRect: TableVirtualizerOptions["observeElementRect"] = (virtualizer, onRectChange) => {
    const scrollElement = virtualizer.scrollElement;

    if (!scrollElement) return;
    if (!isPageScrollElement(scrollElement)) return observeElementRect(virtualizer, onRectChange);

    const ownerWindow = scrollElement.ownerDocument.defaultView!;
    const handleResize = () => onRectChange({ width: ownerWindow.innerWidth, height: ownerWindow.innerHeight });

    handleResize();
    ownerWindow.addEventListener("resize", handleResize);

    return () => ownerWindow.removeEventListener("resize", handleResize);
  };

  const observeScrollOffset: TableVirtualizerOptions["observeElementOffset"] = (virtualizer, onOffsetChange) => {
    const scrollElement = virtualizer.scrollElement;

    if (!scrollElement) return;

    if (!isPageScrollElement(scrollElement)) {
      onOffsetChange(scrollElement.scrollTop, false);
      return observeElementOffset(virtualizer, onOffsetChange);
    }

    const ownerWindow = scrollElement.ownerDocument.defaultView!;
    let scrollEndTimeout: number | undefined;

    const handleScroll = () => {
      ownerWindow.clearTimeout(scrollEndTimeout);
      onOffsetChange(ownerWindow.scrollY, true);

      scrollEndTimeout = ownerWindow.setTimeout(
        () => onOffsetChange(ownerWindow.scrollY, false),
        virtualizer.options.isScrollingResetDelay,
      );
    };

    onOffsetChange(ownerWindow.scrollY, false);
    ownerWindow.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ownerWindow.removeEventListener("scroll", handleScroll);
      ownerWindow.clearTimeout(scrollEndTimeout);
    };
  };

  const scrollToOffset: TableVirtualizerOptions["scrollToFn"] = (offset, options, virtualizer) => {
    const scrollElement = virtualizer.scrollElement;

    if (!scrollElement) return;
    if (!isPageScrollElement(scrollElement)) return elementScroll(offset, options, virtualizer);

    scrollElement.ownerDocument.defaultView!.scrollTo({
      top: offset + (options.adjustments ?? 0),
      behavior: options.behavior,
    });
  };

  const isCompactViewport = useSyncExternalStore(subscribeToCompactView, getCompactView);
  const isActiveView = isCompactViewport === isCompactView;

  useLayoutEffect(() => {
    const tableContainer = bodyRef.current?.parentElement;

    if (!isActiveView || !tableContainer) return;

    const ownerWindow = tableContainer.ownerDocument.defaultView!;
    const updateScrollParent = () => setScrollParent(findScrollParent(tableContainer));
    const resizeObserver = new ResizeObserver(updateScrollParent);
    const mutationObserver = new MutationObserver(updateScrollParent);

    updateScrollParent();
    resizeObserver.observe(tableContainer);

    for (let parent = tableContainer.parentElement; parent; parent = parent.parentElement) {
      resizeObserver.observe(parent);
      mutationObserver.observe(parent, { attributes: true, attributeFilter: ["class", "style"] });
    }

    ownerWindow.addEventListener("resize", updateScrollParent);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      ownerWindow.removeEventListener("resize", updateScrollParent);
    };
  }, [isActiveView]);

  const getItemKey = useCallback((index: number) => data[index].id, [data]);

  const virtualizer = useVirtualizer<HTMLElement, HTMLDivElement>({
    count: data.length,
    getScrollElement: () => scrollParent,
    observeElementRect: observeScrollRect,
    observeElementOffset: observeScrollOffset,
    scrollToFn: scrollToOffset,
    initialOffset: () => scrollParent?.scrollTop ?? 0,
    estimateSize: () => (isCompactView ? 80 : 40),
    getItemKey,
    overscan: 5,
    scrollMargin,
    enabled: isActiveView && scrollParent !== null,
  });

  useLayoutEffect(() => {
    const tableContainer = bodyRef.current?.parentElement;
    const tableBody = bodyRef.current;
    const tableHeader = headerRef.current;

    if (!isActiveView || !tableContainer || !tableBody || !tableHeader || !scrollParent) return;

    const ownerWindow = tableContainer.ownerDocument.defaultView!;
    let containerWidth = tableContainer.clientWidth;

    const updateMeasurements = () => {
      setScrollMargin(getTableBodyOffset(tableBody, scrollParent));

      if (containerWidth !== tableContainer.clientWidth) {
        containerWidth = tableContainer.clientWidth;

        // Wrapped content can change the height of rows outside the rendered window too.
        virtualizer.measure();
        tableBody
          .querySelectorAll<HTMLDivElement>(".sencorp-table-virtual-row")
          .forEach((row) => virtualizer.measureElement(row));
      }
    };

    const resizeObserver = new ResizeObserver(updateMeasurements);

    updateMeasurements();
    resizeObserver.observe(tableContainer);
    resizeObserver.observe(tableHeader);

    for (let parent = tableContainer.parentElement; parent; parent = parent.parentElement) {
      resizeObserver.observe(parent);
    }

    // Capture also covers outer scrollers and position changes above the table.
    ownerWindow.addEventListener("scroll", updateMeasurements, { capture: true, passive: true });
    ownerWindow.addEventListener("resize", updateMeasurements);

    return () => {
      resizeObserver.disconnect();
      ownerWindow.removeEventListener("scroll", updateMeasurements, true);
      ownerWindow.removeEventListener("resize", updateMeasurements);
    };
  }, [isActiveView, scrollParent, virtualizer]);

  useLayoutEffect(() => {
    const tableBody = bodyRef.current;
    const tableContainer = bodyRef.current?.parentElement;

    if (!isActiveView || !scrollParent || !tableBody || !tableContainer) return;

    setScrollMargin(getTableBodyOffset(tableBody, scrollParent));
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();
  const topSpacerHeight = virtualRows.length ? virtualRows[0].start - scrollMargin : 0;
  const bottomSpacerHeight = virtualRows.length
    ? Math.max(0, totalHeight - (virtualRows[virtualRows.length - 1].end - scrollMargin))
    : totalHeight;

  return {
    headerRef,
    bodyRef,
    virtualRows,
    topSpacerHeight,
    bottomSpacerHeight,
    measureRow: virtualizer.measureElement,
  };
};

export default useTableVirtualization;
