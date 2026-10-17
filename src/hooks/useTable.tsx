import { useState } from "react";

import type { SortOrder, TableData, UseTableProps } from "@/types";

import { compute } from "@/lib/util";
import { TableColumnWidth } from "@/lib/const";

export default function useTable<DataType>({
  data,
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

  function toggleRowSelection(rowIndex: number) {
    setTableState((prevState) => {
      const isCurrentlySelected = prevState.selectedRowIndexes.includes(rowIndex);
      const newSelectedRowIndexes = isCurrentlySelected
        ? prevState.selectedRowIndexes.filter((index) => index !== rowIndex)
        : [...prevState.selectedRowIndexes, rowIndex];

      return { ...prevState, selectedRowIndexes: newSelectedRowIndexes, lastSelectedRowIndex: rowIndex };
    });
  }

  return {
    data,
    maxColumnWidth,
    selectionEnabled,
    columns: tableColumns,
    sortBy: tableState.sortBy,
    sortOrder: tableState.sortOrder,
    selectedRowIndexes: tableState.selectedRowIndexes,
    toggleRowSelection,
  };
}
