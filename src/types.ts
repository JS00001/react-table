import { TableSortOrder, TableColumnWidth, TableColumnAlignment } from "@/lib/const";
import React from "react";

type ValueOf<T> = T[keyof T];

export type SortOrder = ValueOf<typeof TableSortOrder>;

export type ColumnWidth = ValueOf<typeof TableColumnWidth>;

export type ColumnAlignment = ValueOf<typeof TableColumnAlignment>;

export type TableColumn<DataType> = {
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

export type UseTableProps<DataType> = {
  /** The rows visible in the table. */
  data: DataType[];
  /** The title of the table. */
  title: string;
  /** The columns visible in the table. */
  columns: TableColumn<DataType>[];
  /** Whether or not the table allows row selection. */
  selectionEnabled?: boolean;
  /** The maximum width of columns that do not have the 'fill' size */
  maxColumnWidth?: number;
};

export type TableData<DataType> = {
  /** The title of the table. */
  title: string;
  /** The rows visible in the table. */
  data: DataType[];
  /** The columns visible in the table. */
  columns: TableColumn<DataType>[];
  /** The maximum column width for columns that do not have the 'fill' size. */
  maxColumnWidth: number;
  /** Whether or not the table allows row selection. */
  selectionEnabled: boolean;
  /** The current sort order of the table. */
  sortOrder: SortOrder | null;
  /** The column that the table is currently sorted by. */
  sortBy: string | null;
  /** The indexes of the currently selected rows. */
  selectedRowIndexes: number[];
  /** Toggle a row as selected or unselected */
  toggleRowSelection: (rowIndex: number) => void;
};

export type TableComponentProps<DataType> = React.HTMLAttributes<HTMLDivElement> & {
  /** The data to be displayed in the table. */
  table: TableData<DataType>;
  /** A function that returns a unique key for each row in the table. */
  getRowKey: (row: DataType, index: number) => string;
  /** The component to be used for rendering each row in the table. */
  rowComponent: React.ComponentType<TableRowComponentProps<DataType>>;
};

export type TableRowComponentProps<DataType> = {
  /** The data for the row. */
  row: DataType;
};
