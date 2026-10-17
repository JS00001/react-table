import type { TableRowData } from "@/types";
import type { HTMLAttributes } from "react";

import { useTableContext } from "@/context/TableContext";
import { useTableThemeContext } from "@/context/TableThemeContext";

type TableRowProps<DataType extends TableRowData> = HTMLAttributes<HTMLDivElement> & {
  row: DataType;
  href?: string;
  compact?: boolean;
};

export default function TableRow<DataType extends TableRowData>({ row, href, compact, ...props }: TableRowProps<DataType>) {
  const table = useTableContext();
  const theme = useTableThemeContext();

  return <></>;
}
