import type { TableComponentProps } from "@/types";

import TableProvider from "../context/TableContext";
import TableHeaderRow from "./rows/TableHeaderRow";

import { styles } from "@/lib/util";
import { TableColumnWidth } from "@/lib/const";

export default function Table<DataType>(props: TableComponentProps<DataType>) {
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
    className,
    style,
  );

  const compactTableStyles = styles("sencorp-table-container-compact-view", className, style);

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

type TableContentProps<DataType> = TableComponentProps<DataType> & {
  isCompactView: boolean;
};

function TableContent<DataType>({ table, isCompactView, rowComponent: RowComponent, getRowKey }: TableContentProps<DataType>) {
  return (
    <TableProvider {...table} isCompactView={isCompactView}>
      <TableHeaderRow />
      <div id="table-body" className="contents">
        {table.data.map((row, index) => (
          <RowComponent key={getRowKey(row, index)} row={row} />
        ))}
      </div>
    </TableProvider>
  );
}
