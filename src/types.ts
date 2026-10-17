import { TableSortOrder, TableColumnWidth, TableColumnAlignment } from "@/lib/const";

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
  /** The columns visible in the table. */
  columns: TableColumn<DataType>[];
  /** Whether or not the table allows row selection. */
  selectionEnabled?: boolean;
};

export type TableData<DataType> = {
  /** The rows visible in the table. */
  data: DataType[];
  /** The columns visible in the table. */
  columns: TableColumn<DataType>[];
  /** The current sort order of the table. */
  sortOrder: SortOrder | null;
  /** The column that the table is currently sorted by. */
  sortBy: string | null;
  /** The indexes of the currently selected rows. */
  selectedRowIndexes: number[];
  /** Toggle a row as selected or unselected */
  toggleRowSelection: (rowIndex: number) => void;
};
