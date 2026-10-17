import type { HTMLAttributes } from "react";

import { useTableContext } from "@/context/TableContext";
import { useTableThemeContext } from "@/context/TableThemeContext";

type TableRowProps<DataType> = HTMLAttributes<HTMLDivElement> & {
  row: DataType;
  href?: string;
  compact?: boolean;
};

export default function TableRow<DataType>({ row, href, compact, ...props }: TableRowProps<DataType>) {
  const table = useTableContext();
  const theme = useTableThemeContext();

  return <></>;
}
