import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

export type TableThemeContextType = {
  /** CSS classes applied to the table container. */
  tableContainerClassName?: string;
  /** Inline styles applied to the table container. */
  tableContainerStyles?: React.CSSProperties;
  /** CSS classes applied to table header cells. */
  tableHeaderCellClassName?: string;
  /** Inline styles applied to table header cells. */
  tableHeaderCellStyles?: React.CSSProperties;
  /** CSS classes applied to table body cells. */
  tableCellClassName?: string;
  /** Inline styles applied to table body cells. */
  tableCellStyles?: React.CSSProperties;
  /** Background color used when a row is hovered. */
  tableCellHoverBackgroundColor?: string;
  /** Background color used while a row is pressed. */
  tableCellActiveBackgroundColor?: string;
  /** Background color used for cells in a selected row. */
  tableCellSelectedBackgroundColor?: string;
  /** Color used for the table selection checkbox's border when unselected. */
  tableInactiveCheckboxColor?: string;
  /** Color used for the table selection checkbox. */
  tableActiveCheckboxColor?: string;
  /** Color used for the check and minus icons in table checkboxes. */
  tableActiveCheckboxIconColor?: string;
  /** Corner radius of table selection checkboxes. Numbers are interpreted as pixels. */
  tableCheckboxBorderRadius?: React.CSSProperties["borderRadius"];
};

export const TableThemeContext = createContext<TableThemeContextType | undefined>(undefined);

export type TableThemeProviderProps = PropsWithChildren<TableThemeContextType>;

export default function TableThemeProvider({ children, ...theme }: TableThemeProviderProps) {
  const themeValues: TableThemeContextType = {
    ...theme,
    tableCheckboxBorderRadius: theme.tableCheckboxBorderRadius ?? 4,
    tableActiveCheckboxIconColor: theme.tableActiveCheckboxIconColor ?? "#ffffff",
    tableActiveCheckboxColor: theme.tableActiveCheckboxColor ?? "oklch(54.6% 0.245 262.881)",
    tableInactiveCheckboxColor: theme.tableInactiveCheckboxColor ?? "oklch(87.2% 0.01 258.338)",
    tableCellHoverBackgroundColor: theme.tableCellHoverBackgroundColor ?? "oklch(98.5% 0.002 247.839)",
    tableCellActiveBackgroundColor: theme.tableCellActiveBackgroundColor ?? "oklch(96.7% 0.003 264.542)",
    tableCellSelectedBackgroundColor: theme.tableCellSelectedBackgroundColor ?? "oklch(92.8% 0.006 264.531)",
  };

  return <TableThemeContext.Provider value={themeValues}>{children}</TableThemeContext.Provider>;
}

export function useTableThemeContext() {
  const context = useContext(TableThemeContext);

  if (!context) {
    throw new Error("Your app must be wrapped in a <TableThemeProvider> to use this library.");
  }

  return context;
}
