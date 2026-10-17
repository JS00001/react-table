import { createContext, useContext } from "react";

type TableThemeProviderProps = {};

type TableThemeContextType = {};

export const TableThemeContext = createContext<TableThemeContextType | undefined>(undefined);

export default function TableThemeProvider({}: TableThemeProviderProps) {
  return <TableThemeContext.Provider value={{}}></TableThemeContext.Provider>;
}

export function useTableThemeContext() {
  const context = useContext(TableThemeContext);

  if (!context) {
    throw new Error("useTableThemeContext must be used within a TableThemeProvider");
  }

  return context;
}
