import { createContext, PropsWithChildren, useContext } from "react";

import { TableComponentProps } from "@/types";

type TableProviderProps<DataType> = TableComponentProps<DataType> & {
  isCompactView: boolean;
};

type TableProviderContext = {
  isCompactView: boolean;
};

const TableContext = createContext<TableProviderContext | undefined>(undefined);

export default function TableProvider<DataType>({
  children,
  isCompactView,
  ...props
}: PropsWithChildren<TableProviderProps<DataType>>) {
  return <TableContext.Provider value={{ isCompactView }}>{children}</TableContext.Provider>;
}

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context;
}
