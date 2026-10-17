# Sidebar

[All components](../README.md#components)

Sidebars follow the modal API: a root provider owns the stack, a typed app hook reads it, and each component receives the props passed to `open`. All panels share one backdrop, so opening another panel does not darken the page again.

## Setup

Install `motion@^12.23.0` in your app if it is not already present. Motion is a peer dependency and is excluded from this library’s build. No stylesheet import is required; sidebar layout styles are inline.

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

Create your wrapper once and use it anywhere under the provider, including inside sidebar components. Props and names are inferred from the component object. Components without required props can be opened without a props argument.

## Stack methods

| Method | Behavior |
| --- | --- |
| `open(name, props)` | Open a sidebar with its typed props. An existing name moves to the top with updated props. Reopening an exiting sidebar cancels its exit. |
| `close(name)` | Slide out the named sidebar. |
| `pop()` | Slide out the most recently opened sidebar that is not already closing. |
| `closeAll()` | Slide out all panels. |

Escape and clicks on the shared backdrop call `pop()`. Clicks inside panels keep them open. Lower panels remain mounted with their local state preserved. One instance of each name can be open at a time.

## Provider props

| Prop | Default | Purpose |
| --- | --- | --- |
| `sidebars` | Required | Component registry keyed by sidebar name. |
| `sidebarBackgroundColor` | `#ffffff` | Default panel background color. |
| `sidebarBackdropColor` | `rgb(0 0 0 / 50%)` | Color of the single shared backdrop. |
| `children` | — | Your app. |

The provider portals the backdrop and stack directly into `document.body` after client mounting. There is one backdrop per provider, retained until the last panel finishes closing. It fades in over 200ms when the first panel opens, fades out when the last panel closes, and stays unchanged when only the top panel closes. Sidebars sit below this library's modals.

## Sidebar component

`Sidebar` renders a white panel on the right, `24rem` wide and full height, capped at the viewport width. Its content scrolls vertically. Pass `className`, `style`, children, and other HTML attributes to customize the panel. `style.backgroundColor` overrides the provider color. Provide `aria-label` or `aria-labelledby` to name the panel.

Motion slides panels in and out over 200ms. `AnimatePresence` keeps closing panels and the shared backdrop mounted until their exits finish. The backdrop fades in when the first panel opens and fades out when the last closes. Exiting panels ignore pointer interaction.
