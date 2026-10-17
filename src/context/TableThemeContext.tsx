import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

export type TableThemeContextType = {
  tableContainerClassName?: string;
  tableContainerStyles?: React.CSSProperties;
  tableHeaderCellClassName?: string;
  tableHeaderCellStyles?: React.CSSProperties;
  tableCellClassName?: string;
  tableCellStyles?: React.CSSProperties;
};

export const TableThemeContext = createContext<TableThemeContextType | undefined>(undefined);

export type TableThemeProviderProps = PropsWithChildren<TableThemeContextType>;

export default function TableThemeProvider({ children, ...theme }: TableThemeProviderProps) {
  return <TableThemeContext.Provider value={theme}>{children}</TableThemeContext.Provider>;
}

export function useTableThemeContext() {
  const context = useContext(TableThemeContext);

  if (!context) {
    throw new Error("Your app must be wrapped in a <TableThemeProvider> to use this library.");
  }

  return context;
}
