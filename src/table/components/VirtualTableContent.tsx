import type { TableComponentProps, TableRowData } from "@/table/types";

import TableProvider from "@/table/context/TableContext";
import TableHeaderRow from "@/table/components/rows/TableHeaderRow";
import useTableVirtualization from "@/table/hooks/useTableVirtualization";

type VirtualTableContentProps<DataType extends TableRowData> = TableComponentProps<DataType> & {
  isCompactView: boolean;
};

export default function VirtualTableContent<DataType extends TableRowData>({
  table,
  isCompactView,
  rowComponent: RowComponent,
}: VirtualTableContentProps<DataType>) {
  const { headerRef, bodyRef, virtualRows, measureRow, topSpacerHeight, bottomSpacerHeight } = useTableVirtualization({
    data: table.data,
    isCompactView,
  });

  return (
    <TableProvider {...table} isCompactView={isCompactView}>
      <div ref={headerRef} className="sencorp-table-virtual-header">
        <TableHeaderRow />
      </div>

      <div ref={bodyRef} id="table-body" className="sencorp-table-virtual-body">
        <div aria-hidden="true" className="sencorp-table-virtual-spacer" style={{ height: topSpacerHeight }} />

        {virtualRows.map((virtualRow) => (
          <div key={virtualRow.key} ref={measureRow} data-index={virtualRow.index} className="sencorp-table-virtual-row">
            <RowComponent row={table.data[virtualRow.index]} />
          </div>
        ))}

        <div aria-hidden="true" className="sencorp-table-virtual-spacer" style={{ height: bottomSpacerHeight }} />
      </div>
    </TableProvider>
  );
}
