import { useState } from "react";

import type { SortOrder, TableData, TableRowData, UseTableProps } from "@/types";

import { compute } from "@/lib/util";
import { InternalCheckboxColumnId, TableColumnWidth, TableSortOrder } from "@/lib/const";

export default function useTable<DataType extends TableRowData>({
  data,
  title,
  columns,
  maxColumnWidth = 200,
  selectionEnabled = false,
  virtualized = false,
}: UseTableProps<DataType>): TableData<DataType> {
  const [tableState, setTableState] = useState({
    sortBy: null as string | null,
    sortOrder: null as SortOrder | null,
    selectedIds: [] as DataType["id"][],
    lastSelectedId: null as DataType["id"] | null,
  });

  const tableColumns = compute(() => {
    const currentColumns = [...columns];

    if (selectionEnabled) {
      currentColumns.unshift({
        name: "",
        alignment: "center",
        id: InternalCheckboxColumnId,
        width: TableColumnWidth.CONTENT,
      });
    }

    return currentColumns;
  });

  const selectAllRows = () => {
    setTableState((prevState) => {
      const allRowIds = data.map((row) => row.id);
      const isAllSelected = prevState.selectedIds.length === allRowIds.length;

      return { ...prevState, selectedIds: isAllSelected ? [] : allRowIds, lastSelectedId: null };
    });
  };

  const toggleRowSelection = (rowId: DataType["id"]) => {
    setTableState((prevState) => {
      const isCurrentlySelected = prevState.selectedIds.includes(rowId);
      const newSelectedIds = isCurrentlySelected
        ? prevState.selectedIds.filter((id) => id !== rowId)
        : [...prevState.selectedIds, rowId];

      return { ...prevState, selectedIds: newSelectedIds, lastSelectedId: rowId };
    });
  };

  const setSortBy = (columnId: string) => {
    setTableState((prevState) => {
      const isSameColumn = prevState.sortBy === columnId;

      const newSortOrder = compute(() => {
        if (isSameColumn && prevState.sortOrder === TableSortOrder.ASC) {
          return TableSortOrder.DESC;
        } else if (isSameColumn && prevState.sortOrder === TableSortOrder.DESC) {
          return null;
        } else {
          return TableSortOrder.ASC;
        }
      });

      return { ...prevState, sortBy: columnId, sortOrder: newSortOrder };
    });
  };

  return {
    data,
    title,
    maxColumnWidth,
    selectionEnabled,
    virtualized,
    columns: tableColumns,
    sortBy: tableState.sortBy,
    sortOrder: tableState.sortOrder,
    selectedIds: tableState.selectedIds,
    setSortBy,
    selectAllRows,
    toggleRowSelection,
  };
}
