import { useTableThemeContext } from "@/context/TableThemeContext";
import { styles } from "@/lib/util";
import { HTMLAttributes } from "react";

type TableCellProps = HTMLAttributes<HTMLDivElement>;

export default function TableCell({ style, className, ...props }: TableCellProps) {
  const theme = useTableThemeContext();

  const cellStyles = styles(
    { "--table-cell-hover-background-color": theme.tableCellHoverBackgroundColor },
    { "--table-cell-active-background-color": theme.tableCellActiveBackgroundColor },
    { "--table-cell-selected-background-color": theme.tableCellSelectedBackgroundColor },
    theme.tableCellClassName,
    theme.tableCellStyles,
    className,
    style,
  );

  return <div></div>;
}
