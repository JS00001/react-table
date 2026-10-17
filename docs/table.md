![Sencorp React UI Table](https://cdn.sencorpllc.com/sencorp-react-ui-documentation-table.png)

# Table

[All components](../README.md#components)

## Setup

1. Use React 18 or 19 and install the package:

   ```sh
   npm install @sencorp/react-ui
   ```

2. Import the table stylesheet once in your app:

```tsx
import "@sencorp/react-ui/table/styles.css";
```

## Migrating from @sencorp/react-table

Replace `@sencorp/react-table` imports with `@sencorp/react-ui/table` and the stylesheet import with `@sencorp/react-ui/table/styles.css`. Component names and props stay the same.

## Create a table

To create a table:

1. **Define your data and columns.** Give every row a unique, stable `id` (a string or number). Columns define the headings and their order.
2. **Create a row component.** Use `TableRow` and render one `TableCell` per column, in the same order. Use `useTableContext().isCompactView` to render a simpler row for smaller screens.
3. **Call `useTable`.** Pass your title, data, and columns to the hook.
4. **Render the table.** Wrap `Table` in `TableThemeProvider`, then pass the hook result as `table` and your row component as `rowComponent`. The provider is required, even with the default theme.

Here is a complete example:

```tsx
import { Table, TableRow, TableCell, TableThemeProvider, useTable, useTableContext } from "@sencorp/react-ui/table";
import type { TableColumn, TableRowComponentProps } from "@sencorp/react-ui/table";

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
  { id: "1", email: "alex@example.com", firstName: "Alex", lastName: "Morgan" },
  { id: "2", email: "jamie@example.com", firstName: "Jamie", lastName: "Chen" },
];

function PersonRow({ row }: TableRowComponentProps<Person>) {
  const { isCompactView } = useTableContext();

  if (isCompactView) {
    return (
      <TableRow compact row={row}>
        {row.email}
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

export default function PeopleTable() {
  const table = useTable({ title: "People", data: people, columns });

  return (
    <TableThemeProvider tableHeaderCellStyles={{ padding: "8px" }}>
      <Table table={table} rowComponent={PersonRow} />
    </TableThemeProvider>
  );
}
```

## Customize

Pass these optional props to `TableThemeProvider`. Colors accept any CSS color value.

| Option                             | Type                  | What it changes                                          | Default                      |
| ---------------------------------- | --------------------- | -------------------------------------------------------- | ---------------------------- |
| `tableContainerClassName`          | `string`              | Classes on the table container.                          | None                         |
| `tableContainerStyles`             | `React.CSSProperties` | Inline styles on the table container.                    | None                         |
| `tableHeaderCellClassName`         | `string`              | Classes on header cells and the compact title.           | None                         |
| `tableHeaderCellStyles`            | `React.CSSProperties` | Inline styles on header cells and the compact title.     | None                         |
| `tableCellClassName`               | `string`              | Classes on body cells and compact rows.                  | None                         |
| `tableCellStyles`                  | `React.CSSProperties` | Inline styles on body cells and compact rows.            | None                         |
| `tableCellHoverBackgroundColor`    | `string`              | Row background on hover.                                 | `oklch(98.5% 0.002 247.839)` |
| `tableCellActiveBackgroundColor`   | `string`              | Row background while pressed.                            | `oklch(96.7% 0.003 264.542)` |
| `tableCellSelectedBackgroundColor` | `string`              | Selected row background (regular rows only).             | `oklch(92.8% 0.006 264.531)` |
| `tableInactiveCheckboxColor`       | `string`              | Unchecked checkbox border.                               | `oklch(87.2% 0.01 258.338)`  |
| `tableActiveCheckboxColor`         | `string`              | Checked or indeterminate checkbox background and border. | `oklch(54.6% 0.245 262.881)` |
| `tableActiveCheckboxIconColor`     | `string`              | Checkbox check and minus icon color.                     | `#ffffff`                    |
| `tableCheckboxBorderRadius`       | `string \| number`    | Checkbox corner radius. Numbers are pixels.              | `0`                          |

Use your own CSS classes or inline styles. Tailwind is optional.

## Selection and sorting

Set `selectionEnabled: true` in `useTable` to enable selection. `TableRow` adds a selection checkbox automatically for regular rows. Compact rows cannot be selected.

- `table.selectedIds` contains the selected row IDs.
- `table.toggleRowSelection(id)` selects or deselects one row.
- Shift-click a row checkbox to select or deselect the inclusive range from the last normally clicked checkbox. The range follows the current data order and matches that checkbox's selected state.
- `table.toggleRowSelection(id, true)` applies the same range selection programmatically. Without a previous row in the current data, it toggles just that row.
- `table.selectAllRows()` toggles all rows.

Set `sortable: true` on a column to enable its sorting control. Use `table.sortBy` and `table.sortOrder` to sort the data you pass to `useTable`, or request sorted results from your server.

## Virtualization

For large tables, set `virtualized: true` in `useTable`:

```tsx
const table = useTable({ title: "People", data: people, columns, virtualized: true });

<Table table={table} rowComponent={PersonRow} />;
```

