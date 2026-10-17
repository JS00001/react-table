import type { TableRowData } from "@/types";
import type { HTMLAttributes, AnchorHTMLAttributes, MouseEventHandler } from "react";

import { styles } from "@/lib/util";
import { useTableContext } from "@/context/TableContext";
import { useTableThemeContext } from "@/context/TableThemeContext";

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

type TableRowProps<DataType extends TableRowData> = DivRowProps<DataType> | LinkRowProps<DataType>;

export default function TableRow<DataType extends TableRowData>(props: TableRowProps<DataType>) {
  const table = useTableContext();
  const theme = useTableThemeContext();

  const { row, href, compact, style, className, children, onClick } = props;

  const isClickable = !!(href || onClick);
  const isFirstRow = table.data[0]?.id === row.id;
  const isSelected = table.selectedIds.includes(row.id);

  const largeContainerStyles = styles({ display: "contents" }, className, style);
  const compactContainerStyles = styles({ display: "flex", flexDirection: "column" }, className, style);
  const containerStyles = compact ? compactContainerStyles : largeContainerStyles;

  if (props.href !== undefined) {
    const { row, href, compact, style, className, children, onClick, ...anchorProps } = props;

    return (
      <a {...anchorProps} id="table-row" href={href} className={containerStyles.className} style={containerStyles.style}>
        {children}
      </a>
    );
  }

  const divProps = { ...props } as HTMLAttributes<HTMLDivElement>;
  const divOnClick = onClick as MouseEventHandler<HTMLDivElement> | undefined;

  return (
    <div {...divProps} id="table-row" className={containerStyles.className} style={containerStyles.style} onClick={divOnClick}>
      {children}
    </div>
  );
}
