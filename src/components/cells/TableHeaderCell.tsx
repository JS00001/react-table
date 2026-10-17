import type { TableColumn } from "@/types";

import { styles } from "@/lib/util";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { useTableContext } from "@/context/TableContext";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import { TableColumnAlignment, TableSortOrder } from "@/lib/const";
import { useTableThemeContext } from "@/context/TableThemeContext";

type TableHeaderCellProps = {
  column: TableColumn;
};

export default function TableHeaderCell({ column }: TableHeaderCellProps) {
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
      <p>{column.name}</p>
      {isSortingAscending && <ArrowDownIcon size={14} />}
      {isSortingDescending && <ArrowUpIcon size={14} />}
    </div>
  );
}
