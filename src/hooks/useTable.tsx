import { useState } from "react";

import type { SortOrder, TableData, UseTableProps } from "@/types";

import { compute } from "@/lib/util";
import { TableColumnWidth, TableSortOrder } from "@/lib/const";

export default function useTable<DataType>({
  data,
  title,
  columns,
  maxColumnWidth = 200,
  selectionEnabled = false,
}: UseTableProps<DataType>): TableData<DataType> {
  const [tableState, setTableState] = useState({
    sortBy: null as string | null,
    sortOrder: null as SortOrder | null,
    lastSelectedRowIndex: null as number | null,
    selectedRowIndexes: [] as number[],
  });

  const tableColumns = compute(() => {
    const currentColumns = [...columns];

    if (selectionEnabled) {
      currentColumns.unshift({
        name: "",
        alignment: "center",
        id: "internal-checkbox-column",
        width: TableColumnWidth.CONTENT,
      });
    }

    return currentColumns;
  });

  const toggleRowSelection = (rowIndex: number) => {
    setTableState((prevState) => {
      const isCurrentlySelected = prevState.selectedRowIndexes.includes(rowIndex);
      const newSelectedRowIndexes = isCurrentlySelected
        ? prevState.selectedRowIndexes.filter((index) => index !== rowIndex)
        : [...prevState.selectedRowIndexes, rowIndex];

      return { ...prevState, selectedRowIndexes: newSelectedRowIndexes, lastSelectedRowIndex: rowIndex };
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
    columns: tableColumns,
    sortBy: tableState.sortBy,
    sortOrder: tableState.sortOrder,
    selectedRowIndexes: tableState.selectedRowIndexes,
    toggleRowSelection,
    setSortBy,
  };
}
