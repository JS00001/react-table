import colors from "tailwindcss/colors";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "@/styles.css";

import TableRow from "@/components/rows/TableRow";
import TableCell from "@/components/cells/TableCell";
import { Table, TableThemeProvider, useTable } from "@/index";
import type { TableColumn, TableRowComponentProps } from "@/types";
import { useTableContext } from "@/context/TableContext";

type Person = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const columns: TableColumn[] = [
  { id: "email", name: "Email", width: "fill" },
  { id: "firstName", name: "First name", width: "fill" },
  { id: "lastName", name: "Last name", width: "fill" },
];

const people: Person[] = [
  { id: "person-1", email: "alex.morgan@example.com", firstName: "Alex", lastName: "Morgan" },
  { id: "person-2", email: "jamie.chen@example.com", firstName: "Jamie", lastName: "Chen" },
  { id: "person-3", email: "taylor.patel@example.com", firstName: "Taylor", lastName: "Patel" },
  { id: "person-4", email: "jordan.brooks@example.com", firstName: "Jordan", lastName: "Brooks" },
  { id: "person-5", email: "casey.rivera@example.com", firstName: "Casey", lastName: "Rivera" },
];

function PersonRow({ row }: TableRowComponentProps<Person>) {
  const { isCompactView } = useTableContext();

  if (isCompactView) {
    return (
      <TableRow compact row={row}>
        <p>{row.email}</p>
      </TableRow>
    );
  }

  return (
    <TableRow row={row}>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.firstName}</TableCell>
      <TableCell>{row.lastName}</TableCell>
    </TableRow>
  );
}

function Playground() {
  const table = useTable({ data: people, columns, title: "People" });

  return (
    <TableThemeProvider
      tableCellClassName="border-t border-gray-200 py-2"
      tableCellHoverBackgroundColor={colors.blue[50]}
      tableCellActiveBackgroundColor={colors.blue[100]}
    >
      <Table table={table} rowComponent={PersonRow} className="border border-gray-200" />
    </TableThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Playground />);
