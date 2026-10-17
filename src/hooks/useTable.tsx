import { useState } from "react";

import type { SortOrder, TableData, UseTableProps } from "@/types";

import { compute } from "@/lib/util";
import { TableColumnWidth } from "@/lib/const";

export default function useTable<DataType>({ columns, selectionEnabled, data }: UseTableProps<DataType>): TableData<DataType> {
  const [tableState, setTableState] = useState({
    sortBy: null as string | null,
    sortOrder: null as SortOrder | null,
    lastSelectedRowIndex: null as number | null,
    selectedRowIndexes: [] as number[],
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

  return {
    data,
    columns: tableColumns,
    sortBy: tableState.sortBy,
    sortOrder: tableState.sortOrder,
    selectedRowIndexes: tableState.selectedRowIndexes,
    toggleRowSelection,
  };
}
