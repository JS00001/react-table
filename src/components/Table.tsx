import type { TableComponentProps, TableRowData } from "@/types";

import TableProvider from "@/context/TableContext";
import TableHeaderRow from "@/components/rows/TableHeaderRow";

import { styles } from "@/lib/util";
import { TableColumnWidth } from "@/lib/const";
import { useTableThemeContext } from "@/context/TableThemeContext";

export default function Table<DataType extends TableRowData>(props: TableComponentProps<DataType>) {
  const theme = useTableThemeContext();
  const { table, className, style } = props;
  const { columns, maxColumnWidth } = table;

  const columnWidths = {
    [TableColumnWidth.CONTENT]: `min-content`,
    [TableColumnWidth.AUTO]: `fit-content(${maxColumnWidth}px)`,
    [TableColumnWidth.FILL]: `minmax(${maxColumnWidth}px, 1fr)`,
  };

  const largeTableStyles = styles(
    "sencorp-table-container-large-view",
    { gridTemplateColumns: columns.map((col) => columnWidths[col.width ?? TableColumnWidth.AUTO]).join(" ") },
    theme.tableContainerClassName,
    theme.tableContainerStyles,
    className,
    style,
  );

  const compactTableStyles = styles(
    "sencorp-table-container-compact-view",
    theme.tableContainerClassName,
    theme.tableContainerStyles,
    className,
    style,
  );

  return (
    <>
      <div id="table-container" className={largeTableStyles.className} style={largeTableStyles.style}>
        <TableContent {...props} isCompactView={false} />
      </div>
      <div id="table-container" className={compactTableStyles.className} style={compactTableStyles.style}>
        <TableContent {...props} isCompactView={true} />
      </div>
    </>
  );
}

type TableContentProps<DataType extends TableRowData> = TableComponentProps<DataType> & {
  isCompactView: boolean;
};

function TableContent<DataType extends TableRowData>({
  table,
  isCompactView,
  rowComponent: RowComponent,
}: TableContentProps<DataType>) {
  return (
    <TableProvider {...table} isCompactView={isCompactView}>
      <TableHeaderRow />

      <div id="table-body" style={{ display: "contents" }}>
        {table.data.map((row) => (
          <RowComponent key={row.id} row={row} />
        ))}
      </div>
    </TableProvider>
  );
}
