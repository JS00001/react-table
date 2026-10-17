import { Fragment } from "react";

import { InternalCheckboxColumnId } from "@/lib/const";
import { useTableContext } from "@/context/TableContext";
import TableHeaderCell from "@/components/cells/TableHeaderCell";
import { useTableThemeContext } from "@/context/TableThemeContext";

export default function TableHeaderRow() {
  const table = useTableContext();
  const theme = useTableThemeContext();

  const hasRows = table.data.length > 0;
  const selectedRowCount = table.data.filter((row) => table.selectedIds.includes(row.id)).length;
  const isEveryRowSelected = hasRows && table.data.length === selectedRowCount;
  const isSomeRowsSelected = selectedRowCount > 0 && !isEveryRowSelected;

  if (table.isCompactView) {
    return (
      <div id="table-header" className={theme.tableHeaderCellClassName} style={theme.tableHeaderCellStyles}>
        {table.title}
      </div>
    );
  }

  return (
    <div id="table-header" className="sencorp-table-header-row">
      {table.columns.map((column, index) => (
        <Fragment key={index}>
          <TableHeaderCell column={column}>
            {column.id === InternalCheckboxColumnId ? <></> : <p>{column.name}</p>}
          </TableHeaderCell>
        </Fragment>
      ))}
    </div>
  );
}
