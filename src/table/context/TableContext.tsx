import { createContext, PropsWithChildren, useContext } from "react";

import type { TableData, TableRowData } from "@/table/types";

export type TableProviderContext<DataType extends TableRowData> = TableData<DataType> & {
  isCompactView: boolean;
};

const TableContext = createContext<TableProviderContext<TableRowData> | undefined>(undefined);

export type TableProviderProps<DataType extends TableRowData> = PropsWithChildren<TableProviderContext<DataType>>;

export default function TableProvider<DataType extends TableRowData>({ children, ...props }: TableProviderProps<DataType>) {
  return <TableContext.Provider value={props}>{children}</TableContext.Provider>;
}

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context;
}
