import { createContext, PropsWithChildren, useContext } from "react";

import type { TableData } from "@/types";

type TableProviderContext<DataType> = TableData<DataType> & {
  isCompactView: boolean;
};

const TableContext = createContext<TableProviderContext<any> | undefined>(undefined);

export default function TableProvider<DataType>({ children, ...props }: PropsWithChildren<TableProviderContext<DataType>>) {
  return <TableContext.Provider value={props}>{children}</TableContext.Provider>;
}

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context;
}
