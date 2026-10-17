import { PropsWithChildren } from "react";
import type { TableColumn } from "@/table/types";

import { styles } from "@/util";
import ArrowUpIcon from "@/table/components/icons/ArrowUpIcon";
import { useTableContext } from "@/table/context/TableContext";
import ArrowDownIcon from "@/table/components/icons/ArrowDownIcon";
import { TableColumnAlignment, TableSortOrder } from "@/table/const";
import { useTableThemeContext } from "@/table/context/TableThemeContext";

export type TableHeaderCellProps = {
  column: TableColumn;
};

export default function TableHeaderCell({ column, children }: PropsWithChildren<TableHeaderCellProps>) {
  const table = useTableContext();
  const theme = useTableThemeContext();

  const isSortedBy = table.sortBy === column.id;
  const isSortingAscending = isSortedBy && table.sortOrder === TableSortOrder.ASC;
  const isSortingDescending = isSortedBy && table.sortOrder === TableSortOrder.DESC;

  const headerStyles = styles(
    { display: "flex", alignItems: "center", gap: "8px" },
    column.sortable ? { cursor: "pointer" } : { cursor: "default" },
    column.alignment === TableColumnAlignment.CENTER && { justifyContent: "center" },
    column.alignment === TableColumnAlignment.RIGHT && { justifyContent: "flex-end" },
    column.alignment === TableColumnAlignment.LEFT && { justifyContent: "flex-start" },
    theme.tableHeaderCellClassName,
    theme.tableHeaderCellStyles,
  );

  const handleHeaderClick = () => {
    if (!column.sortable) return;
    table.setSortBy(column.id);
  };

  return (
    <div className={headerStyles.className} style={headerStyles.style} onClick={handleHeaderClick}>
      {children}
      {isSortingAscending && <ArrowDownIcon size={14} />}
      {isSortingDescending && <ArrowUpIcon size={14} />}
    </div>
  );
}
