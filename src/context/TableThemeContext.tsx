import { createContext, useContext } from "react";

type TableThemeContextType = {
  tableContainerClassName?: string;
  tableContainerStyles?: React.CSSProperties;
  tableHeaderCellClassName?: string;
  tableHeaderCellStyles?: React.CSSProperties;
};

export const TableThemeContext = createContext<TableThemeContextType | undefined>(undefined);

export default function TableThemeProvider(props: TableThemeContextType) {
  return <TableThemeContext.Provider value={props}></TableThemeContext.Provider>;
}

export function useTableThemeContext() {
  const context = useContext(TableThemeContext);

  if (!context) {
    throw new Error("Your app must be wrapped in a <TableThemeProvider> to use this library.");
  }

  return context;
}
