import colors from "tailwindcss/colors";
import { useState } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "@sencorp/react-ui/modal/styles.css";
import "@sencorp/react-ui/table/styles.css";
import type { TableColumn, TableRowComponentProps } from "@sencorp/react-ui/table";

import { Modal, ModalProvider, useModal as useLibraryModal } from "@sencorp/react-ui/modal";

import { Table, TableRow, TableCell, TableThemeProvider, useTable, useTableContext } from "@sencorp/react-ui/table";

function InfoModal({ message }: { message: string }) {
  const { close } = useModal();

  return (
    <Modal className="w-full max-w-md rounded-lg p-6">
      <h2 className="mb-2 text-lg font-semibold">Info</h2>
      <p className="mb-4 text-gray-600">{message}</p>
      <button type="button" className="cursor-pointer rounded bg-gray-100 px-3 py-2" onClick={() => close("INFO")}>
        Close
      </button>
    </Modal>
  );
}

function DangerModal({ message }: { message: string }) {
  const { close } = useModal();

  return (
    <Modal className="w-full max-w-md rounded-lg p-6">
      <h2 className="mb-2 text-lg font-semibold text-red-600">Danger</h2>
      <p className="mb-4 text-gray-600">{message}</p>
      <button type="button" className="cursor-pointer rounded bg-red-600 px-3 py-2 text-white" onClick={() => close("DANGER")}>
        Close
      </button>
    </Modal>
  );
}

const modals = {
  INFO: InfoModal,
  DANGER: DangerModal,
};

const useModal = () => useLibraryModal<typeof modals>();

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
  const { open } = useModal();
  const [activeTab, setActiveTab] = useState(0);
  const demo = demos[activeTab];

  return (
    <>
      <main className="mx-auto max-w-6xl p-4 sm:p-8">
        <div className="flex gap-2">
          <button
            type="button"
            className="cursor-pointer rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
            onClick={() => open("INFO", { message: "This is the info modal." })}
          >
            Open info modal
          </button>
          <button
            type="button"
            className="cursor-pointer rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
            onClick={() => open("DANGER", { message: "This is the danger modal." })}
          >
            Open danger modal
          </button>
        </div>
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
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <ModalProvider modals={modals}>
    <TableThemeProvider
      tableCellClassName="border-t border-gray-200 px-2 py-2.5 items-center flex text-sm text-gray-800"
      tableHeaderCellClassName="p-2 bg-gray-100 text-xs font-medium text-gray-700"
      tableCellHoverBackgroundColor={colors.blue[50]}
      tableCellActiveBackgroundColor={colors.blue[100]}
    >
      <Playground />
    </TableThemeProvider>
  </ModalProvider>,
);
