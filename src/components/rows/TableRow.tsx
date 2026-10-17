import type { TableRowData } from "@/types";
import type { HTMLAttributes, AnchorHTMLAttributes, MouseEventHandler } from "react";

import { styles } from "@/lib/util";
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
  const theme = useTableThemeContext();
  const { href, compact, style, className, children, onClick } = props;

  const isClickable = !!(href || onClick);

  const largeContainerStyles = styles(
    { display: "contents" },
    isClickable && { cursor: "pointer" },
    theme.tableCellClassName,
    theme.tableCellStyles,
    className,
    style,
  );

  const compactContainerStyles = styles(
    { display: "flex", flexDirection: "column" },
    isClickable && { cursor: "pointer" },
    className,
    style,
  );

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
