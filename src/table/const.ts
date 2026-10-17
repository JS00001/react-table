/**
 * The available sort orders for a table column
 */
export const TableSortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;

/**
 * The available column widths for a table column
 */
export const TableColumnWidth = {
  FILL: "fill",
  AUTO: "auto",
  CONTENT: "content",
} as const;

/**
 * The available column alignments for a table column
 */
export const TableColumnAlignment = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

/**
 * The internal column id for the checkbox column
 */
export const InternalCheckboxColumnId = "__internal_checkbox_column__";

/**
 * The width of the window at which point to show the compact table view
 */
export const CompactTableViewSize = 1024;
