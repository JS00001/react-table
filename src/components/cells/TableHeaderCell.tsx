import { TableColumn } from "@/types";
import { useTableContext } from "../../context/TableContext";
import { TableSortOrder } from "@/lib/const";
import { styles } from "@/lib/util";

type TableHeaderCellProps = {
  column: TableColumn;
};

export default function TableHeaderCell({ column }: TableHeaderCellProps) {
  const table = useTableContext();

  const isSortedBy = table.sortBy === column.id;
  const isSortingAscending = isSortedBy && table.sortOrder === TableSortOrder.ASC;
  const isSortingDescending = isSortedBy && table.sortOrder === TableSortOrder.DESC;

  const headerStyles = styles();

  const handleHeaderClick = () => {
    if (!column.sortable) return;
  };

  return <></>;
}
