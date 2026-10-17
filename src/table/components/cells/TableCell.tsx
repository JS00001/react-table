import { HTMLAttributes } from "react";

import { styles } from "@/table/lib/util";
import { useTableThemeContext } from "@/table/context/TableThemeContext";

export type TableCellProps = HTMLAttributes<HTMLDivElement>;

export default function TableCell({ style, className, children, ...props }: TableCellProps) {
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

  return (
    <div {...props} id="table-cell" className={cellStyles.className} style={cellStyles.style}>
      {typeof children === "string" ? (
        <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{children}</p>
      ) : (
        children
      )}
    </div>
  );
}
