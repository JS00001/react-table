import { Fragment } from "react";
import { useTableContext } from "../../context/TableContext";

export default function TableHeaderRow() {
  const table = useTableContext();

  const hasRows = table.data.length > 0;
  const isEveryRowSelected = hasRows && table.data.length === table.selectedRowIndexes.length;
  const isSomeRowsSelected = hasRows && table.selectedRowIndexes.length > 0 && !isEveryRowSelected;

  if (table.isCompactView) {
    return <div id="table-header">{table.title}</div>;
  }

  return (
    <div id="table-header" className="sencorp-table-header-row">
      {table.columns.map((column, index) => (
        <Fragment key={index}></Fragment>
      ))}
    </div>
  );
}
