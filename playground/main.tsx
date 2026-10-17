import colors from "tailwindcss/colors";
import { useState } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "@/styles.css";
import type { TableColumn, TableRowComponentProps } from "@/index";

import { Table, TableRow, TableCell, TableThemeProvider, useTable, useTableContext } from "@/index";

type Person = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const columns: TableColumn[] = [
  { id: "email", name: "Email", width: "fill", sortable: true },
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

const largeListOfPeople: Person[] = Array.from({ length: 10_000 }, (_, index) => {
  const person = people[index % people.length];
  return {
    ...person,
    id: `person-${index + 1}`,
    email: `${person.firstName.toLowerCase()}.${person.lastName.toLowerCase()}.${index + 1}@example.com`,
  };
});

const demos = [
  {
    id: "normal",
    label: "Normal table",
    description: "5 rows with the default table rendering.",
    data: people,
    virtualized: false,
  },
  {
    id: "large",
    label: "100 rows",
    description: "100 rows, all rendered without virtualization.",
    data: largeListOfPeople.slice(0, 100),
    virtualized: false,
  },
  {
    id: "virtualized",
    label: "10,000 rows",
    description: "10,000 rows with virtualization. Only visible rows and a small buffer are rendered.",
    data: largeListOfPeople,
    virtualized: true,
  },
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

function DemoTable({ demo }: { demo: (typeof demos)[number] }) {
  const table = useTable({
    data: demo.data,
    columns,
    title: "People",
    selectionEnabled: true,
    virtualized: demo.virtualized,
  });

  return <Table table={table} rowComponent={PersonRow} className="border border-gray-200 rounded-lg" />;
}

function Playground() {
  const [activeTab, setActiveTab] = useState(0);
  const demo = demos[activeTab];

  return (
    <TableThemeProvider
      tableCellClassName="border-t border-gray-200 p-2 items-center flex"
      tableHeaderCellClassName="px-2 py-1 bg-gray-100"
      tableCellHoverBackgroundColor={colors.blue[50]}
      tableCellActiveBackgroundColor={colors.blue[100]}
    >
      <main className="mx-auto max-w-6xl p-4 sm:p-8">
        <div className="my-4 flex gap-2">
          {demos.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`rounded px-3 py-2 cursor-pointer ${activeTab === index ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              onClick={() => setActiveTab(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <section key={demo.id}>
          <p className="mb-4 text-sm text-gray-600">{demo.description}</p>
          <DemoTable demo={demo} />
        </section>
      </main>
    </TableThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Playground />);
