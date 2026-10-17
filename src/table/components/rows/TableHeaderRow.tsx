import { Fragment } from "react";

import { compute } from "@/table/lib/util";
import { InternalCheckboxColumnId } from "@/table/lib/const";
import { useTableContext } from "@/table/context/TableContext";
import TableHeaderCell from "@/table/components/cells/TableHeaderCell";
import { useTableThemeContext } from "@/table/context/TableThemeContext";
import TableSelectionCheckbox from "@/table/components/cells/TableSelectionCheckbox";

export default function TableHeaderRow() {
  const table = useTableContext();
  const theme = useTableThemeContext();

  const hasRows = table.data.length > 0;
  const selectedRowCount = compute(() => {
    const selectedIds = new Set(table.selectedIds);
    return table.data.reduce((count, row) => count + Number(selectedIds.has(row.id)), 0);
  });

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
            {column.id === InternalCheckboxColumnId ? (
              <TableSelectionCheckbox
                value={isEveryRowSelected}
                indeterminate={isSomeRowsSelected}
                onChange={table.selectAllRows}
              />
            ) : (
              <p>{column.name}</p>
            )}
          </TableHeaderCell>
        </Fragment>
      ))}
    </div>
  );
}
