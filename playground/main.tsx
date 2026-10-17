import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles.css";
import Table from "@/components/Table";
import useTable from "@/hooks/useTable";
import type { TableColumn, TableRowComponentProps } from "@/types";

type Person = {
  email: string;
  firstName: string;
  lastName: string;
};

const columns: TableColumn<Person>[] = [
  { id: "email", name: "Email", width: "fill" },
  { id: "firstName", name: "First name", width: "fill" },
  { id: "lastName", name: "Last name", width: "fill" },
];

const people: Person[] = [
  { email: "alex.morgan@example.com", firstName: "Alex", lastName: "Morgan" },
  { email: "jamie.chen@example.com", firstName: "Jamie", lastName: "Chen" },
  { email: "taylor.patel@example.com", firstName: "Taylor", lastName: "Patel" },
  { email: "jordan.brooks@example.com", firstName: "Jordan", lastName: "Brooks" },
  { email: "casey.rivera@example.com", firstName: "Casey", lastName: "Rivera" },
];

function PersonRow({ row, isCompactView }: TableRowComponentProps<Person>) {
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
  const table = useTable({ data: people, columns });

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
        <Table table={table} title="People" getRowKey={(person) => person.email} rowComponent={PersonRow} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
