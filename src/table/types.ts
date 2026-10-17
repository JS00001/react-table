import { TableSortOrder, TableColumnWidth, TableColumnAlignment } from "@/table/const";
import React from "react";

type ValueOf<T> = T[keyof T];

export type SortOrder = ValueOf<typeof TableSortOrder>;

export type ColumnWidth = ValueOf<typeof TableColumnWidth>;

export type ColumnAlignment = ValueOf<typeof TableColumnAlignment>;

export type TableRowData = {
  /** A unique identifier for the row. */
  id: string | number;
};

export type TableColumn = {
  /** The unique identifier for the column. */
  id: string;
  /** The display name of the column in the tables header. */
  name: string;
  /** The amount of space that the column takes up in the table. */
  width?: ColumnWidth;
  /** Whether the column is sortable or not. */
  sortable?: boolean;
  /** The alignment of the column's content. */
  alignment?: ColumnAlignment;
};

export type UseTableProps<DataType extends TableRowData> = {
  /** The rows visible in the table. */
  data: DataType[];
  /** The title of the table. */
  title: string;
  /** The columns visible in the table. */
  columns: TableColumn[];
  /** Whether or not the table allows row selection. */
  selectionEnabled?: boolean;
  /** The maximum width of columns that do not have the 'fill' size */
  maxColumnWidth?: number;
  /** Render only visible rows while the page or nearest scrolling parent scrolls. Defaults to false. */
  virtualized?: boolean;
};

export type TableData<DataType extends TableRowData> = {
  /** The title of the table. */
  title: string;
  /** The rows visible in the table. */
  data: DataType[];
  /** The columns visible in the table. */
  columns: TableColumn[];
  /** The maximum column width for columns that do not have the 'fill' size. */
  maxColumnWidth: number;
  /** Whether or not the table allows row selection. */
  selectionEnabled: boolean;
  /** Whether rows are virtualized. */
  virtualized: boolean;
  /** The current sort order of the table. */
  sortOrder: SortOrder | null;
  /** The column that the table is currently sorted by. */
  sortBy: string | null;
  /** The IDs of the currently selected rows. */
  selectedIds: DataType["id"][];
  /** Select or deselect all rows in the table */
  selectAllRows: () => void;
  /** Set the sort by value to a new column */
  setSortBy: (columnId: string) => void;
  /** Toggle a row, or apply the last clicked row's selection to a range when shiftKey is true. */
  toggleRowSelection: (rowId: DataType["id"], shiftKey?: boolean) => void;
};

export type TableComponentProps<DataType extends TableRowData> = React.HTMLAttributes<HTMLDivElement> & {
  /** The data to be displayed in the table. */
  table: TableData<DataType>;
  /** The component to be used for rendering each row in the table. */
  rowComponent: React.ComponentType<TableRowComponentProps<DataType>>;
};

export type TableRowComponentProps<DataType extends TableRowData> = {
  /** The data for the row. */
  row: DataType;
};
