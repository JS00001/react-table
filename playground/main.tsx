import { createRoot } from "react-dom/client";
import "@/styles.css";

import TableRow from "@/components/rows/TableRow";
import TableCell from "@/components/cells/TableCell";
import { Table, TableThemeProvider, useTable } from "@/index";
import type { TableColumn, TableRowComponentProps } from "@/types";

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
    <TableThemeProvider>
      <Table table={table} rowComponent={PersonRow} />
    </TableThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Playground />);
