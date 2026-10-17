import type { TableRowData } from "@/types";
import type { HTMLAttributes, AnchorHTMLAttributes, MouseEvent, MouseEventHandler } from "react";

import { styles } from "@/lib/util";
import TableCell from "@/components/cells/TableCell";
import { useTableContext } from "@/context/TableContext";
import { useTableThemeContext } from "@/context/TableThemeContext";
import TableSelectionCheckbox from "@/components/cells/TableSelectionCheckbox";

type BaseRowProps<DataType extends TableRowData> = {
  row: DataType;
  compact?: boolean;
};

type DivRowProps<DataType extends TableRowData> = BaseRowProps<DataType> &
  Omit<HTMLAttributes<HTMLDivElement>, "onClick"> & {
    href?: never;
    onClick?: MouseEventHandler<HTMLDivElement>;
  };

type LinkRowProps<DataType extends TableRowData> = BaseRowProps<DataType> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
    href: string;
    onClick?: never;
  };

export type TableRowProps<DataType extends TableRowData> = DivRowProps<DataType> | LinkRowProps<DataType>;

export default function TableRow<DataType extends TableRowData>(props: TableRowProps<DataType>) {
  const table = useTableContext();
  const theme = useTableThemeContext();
  const { href, compact, style, className, children, onClick } = props;

  const isClickable = !!(href || onClick);
  const isSelected = table.selectedIds.includes(props.row.id);
  const isSelectable = !compact && table.selectionEnabled;

  const largeContainerStyles = styles(
    { display: "contents" },
    isSelected && "sencorp-table-row-selected",
    isClickable && { cursor: "pointer" },
    className,
    style,
  );

  const compactContainerStyles = styles(
    { display: "flex", flexDirection: "column" },
    "sencorp-table-row-compact",
    { "--table-cell-hover-background-color": theme.tableCellHoverBackgroundColor },
    { "--table-cell-active-background-color": theme.tableCellActiveBackgroundColor },
    isClickable && { cursor: "pointer" },
    theme.tableCellClassName,
    theme.tableCellStyles,
    className,
    style,
  );

  const containerStyles = compact ? compactContainerStyles : largeContainerStyles;

  const handleRowSelection = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    table.toggleRowSelection(props.row.id, event.shiftKey);
  };

  const SelectionCheckbox = (
    <TableCell onClick={handleRowSelection}>
      <TableSelectionCheckbox value={isSelected} onClick={handleRowSelection} />
    </TableCell>
  );

  if (props.href !== undefined) {
    const { row, href, compact, style, className, children, onClick, ...anchorProps } = props;

    return (
      <a {...anchorProps} id="table-row" href={href} className={containerStyles.className} style={containerStyles.style}>
        {isSelectable && SelectionCheckbox}
        {children}
      </a>
    );
  }

  const divProps = { ...props } as HTMLAttributes<HTMLDivElement>;
  const divOnClick = onClick as MouseEventHandler<HTMLDivElement> | undefined;

  return (
    <div {...divProps} id="table-row" className={containerStyles.className} style={containerStyles.style} onClick={divOnClick}>
      {isSelectable && SelectionCheckbox}
      {children}
    </div>
  );
}
