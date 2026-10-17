![Sencorp React UI Sidebar](https://cdn.sencorpllc.com/sencorp-react-ui-documentation-sidebar.png)

# Sidebar

[All components](../README.md#components)

## Setup

1. Install the package and Motion 12:

   ```sh
   npm install @sencorp/react-ui "motion@^12.23.0"
   ```

2. Create each sidebar component using `Sidebar`. Declare the props you want to pass when opening it.
3. Add the components to a `sidebars` object, using a name for each key.
4. Create an app hook with `useLibrarySidebar<typeof sidebars>()`.
5. Wrap your app in `<SidebarProvider sidebars={sidebars}>`.
6. Call your hook's `open` method with a sidebar name and its props.

No stylesheet import is needed.

## Complete example

```tsx
import { Sidebar, SidebarProvider, useSidebar as useLibrarySidebar } from "@sencorp/react-ui/sidebar";

function MemberSidebar({ name }: { name: string }) {
  const { open, pop } = useSidebar();
  return (
    <Sidebar aria-label="Member" style={{ width: 480, padding: 24 }}>
      <h2>{name}</h2>
      <button onClick={() => open("DETAILS", { name })}>Open details on top</button>
      <button onClick={pop}>Close</button>
    </Sidebar>
  );
}

function DetailsSidebar({ name }: { name: string }) {
  const { pop, closeAll } = useSidebar();
  return (
    <Sidebar aria-label="Member details" style={{ padding: 24 }}>
      <h2>Details for {name}</h2>
      <button onClick={pop}>Back</button>
      <button onClick={closeAll}>Close all</button>
    </Sidebar>
  );
}

const sidebars = {
  MEMBER: MemberSidebar,
  DETAILS: DetailsSidebar,
};

const useSidebar = () => useLibrarySidebar<typeof sidebars>();

function Page() {
  const { open } = useSidebar();
  return <button onClick={() => open("MEMBER", { name: "Alex" })}>Open member</button>;
}

export default function App() {
  return (
    <SidebarProvider sidebars={sidebars}>
      <Page />
    </SidebarProvider>
  );
}
```

Use your app hook in pages and sidebar components beneath the provider. When organizing these into separate files, export `sidebars` from your component list and use `import type { sidebars } from "./sidebars"` in your hook file.

## Stack methods

| Method | Behavior |
| --- | --- |
| `open(name, props)` | Open the named sidebar with its props. Required props must be supplied; omit the props argument if none are required. |
| `close(name)` | Slide out the named sidebar. |
| `pop()` | Close the most recently opened sidebar. |
| `closeAll()` | Slide out all panels. |

## Stacking

Call `open` inside a sidebar to open another on top. Call `pop()` to return to the previous sidebar, or `closeAll()` to dismiss them all.

Use a different name for each sidebar you want open at the same time. Opening an existing name updates its props and brings it to the top.

Press Escape or click the shared backdrop to close the top sidebar.

## Provider props

| Prop | Default | Purpose |
| --- | --- | --- |
| `sidebars` | Required | Your object of sidebar names and components. |
| `sidebarBackgroundColor` | `#ffffff` | Default panel background color. |
| `sidebarBackdropColor` | `rgb(0 0 0 / 50%)` | Color of the single shared backdrop. |
| `sidebarBackdropClassName` | — | CSS classes for the backdrop. |
| `children` | — | Your app. |

Pass CSS color values to customize the panels and shared backdrop:

```tsx
<SidebarProvider
  sidebars={sidebars}
  sidebarBackgroundColor="#ffffff"
  sidebarBackdropColor="rgb(0 0 0 / 50%)"
  sidebarBackdropClassName="blurred-backdrop"
>
  <App />
</SidebarProvider>
```

Add the backdrop class to your app's CSS:

```css
.blurred-backdrop {
  backdrop-filter: blur(4px);
}
```

## Sidebar component

Wrap your sidebar content in `Sidebar`. The default panel is white, aligned to the right, full height, and `24rem` wide up to the viewport width.

Set `className` or `style` to customize the panel. Add your own padding and action buttons:

```tsx
<Sidebar
  className="my-sidebar"
  style={{ width: 480, padding: 24 }}
  aria-labelledby="sidebar-title"
>
  <h2 id="sidebar-title">My sidebar</h2>
  <button onClick={pop}>Close</button>
</Sidebar>
```

Use `aria-label` or `aria-labelledby` to name the sidebar. Set `style.backgroundColor` to override the provider's panel color for an individual sidebar.

Use `Sidebar` and your app's `useSidebar` hook beneath `SidebarProvider`.
