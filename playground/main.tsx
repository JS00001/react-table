import TableThemeProvider from "@/context/TableThemeContext";
import { useTableContext } from "@/context/TableContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles.css";
import Table from "@/components/Table";
import useTable from "@/hooks/useTable";
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
  const { isCompactView } = useTableContext();
  if (isCompactView) {
    return (
      <dl>
        {columns.map((column) => (
          <div key={column.id}>
            <dt>{column.name}</dt>
            <dd>{row[column.id as keyof Person]}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div role="row">
      <div role="cell">{row.email}</div>
      <div role="cell">{row.firstName}</div>
      <div role="cell">{row.lastName}</div>
    </div>
  );
}

function Playground() {
  const table = useTable({ data: people, columns, title: "People" });

  return (
    <main>
      <h1>People</h1>
      <p>Five sample rows for the table playground.</p>
      <section role="table" aria-label="People">
        <div role="row">
          {columns.map((column) => (
            <div key={column.id} role="columnheader">
              {column.name}
            </div>
          ))}
        </div>
        <Table table={table} rowComponent={PersonRow} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TableThemeProvider>
      <Playground />
    </TableThemeProvider>
  </StrictMode>,
);
