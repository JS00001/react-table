# Modal

[All components](../README.md#components)

`ModalProvider` owns the open modal stack and renders the components registered with it. `useModal` reads that shared state through a typed app wrapper. `Modal` provides the backdrop and centered content panel.

## Setup

Install `motion@^12.23.0` in your app if it is not already present. Motion is a peer dependency and is excluded from this library’s build.

No stylesheet import is required. Modal layout styles are inline, and Motion handles the animations.

Register component functions, with each key becoming a modal name. Props are inferred directly from each component; no separate props map or refs are needed.

Here is a complete example:

```tsx
import { Modal, ModalProvider, useModal as useLibraryModal } from "@sencorp/react-ui/modal";

function InfoModal({ message }: { message: string }) {
  const { open, close } = useModal();

  return (
    <Modal aria-labelledby="info-title" style={{ width: 400, padding: 24 }}>
      <h2 id="info-title">Info</h2>
      <p>{message}</p>
      <button onClick={() => open("DANGER", { title: "Continue?" })}>
        Open danger on top
      </button>
      <button onClick={() => close("INFO")}>Close info</button>
    </Modal>
  );
}

function DangerModal({ title }: { title: string }) {
  const { pop, closeAll } = useModal();

  return (
    <Modal aria-labelledby="danger-title" style={{ width: 320, padding: 24 }}>
      <h2 id="danger-title">{title}</h2>
      <button onClick={pop}>Back to previous modal</button>
      <button onClick={closeAll}>Close all modals</button>
    </Modal>
  );
}

function HelpModal() {
  const { pop } = useModal();

  return (
    <Modal aria-label="Help" style={{ padding: 24 }}>
      <p>Help content</p>
      <button onClick={pop}>Close</button>
    </Modal>
  );
}

const modals = {
  INFO: InfoModal,
  DANGER: DangerModal,
  HELP: HelpModal,
};

// Create this wrapper once in your app. It does not create any modal state.
const useModal = () => useLibraryModal<typeof modals>();

function Page() {
  const { open } = useModal();

  return (
    <>
      <button onClick={() => open("INFO", { message: "Hello!" })}>Open info</button>
      <button onClick={() => open("HELP")}>Open help</button>
    </>
  );
}

export default function App() {
  return (
    <ModalProvider modals={modals}>
      <Page />
    </ModalProvider>
  );
}
```

Put the provider at the root of your app. All calls to your wrapper share its state, including calls inside modal components. When splitting this example across files, the wrapper can use `import type { modals } from "./modals"` to reference the registry without adding a runtime import.

## Opening and closing

| Method | Behavior |
| --- | --- |
| `open(name, props)` | Open the registered component with its props. Required props must be supplied. If all props are optional, the props argument can be omitted. |
| `close(name)` | Close the named modal, even if it is underneath another modal. |
| `pop()` | Close the most recently opened modal. Does nothing if the stack is empty. |
| `closeAll()` | Close every open modal. |

TypeScript checks both names and props from the component registry:

```tsx
const { open, close } = useModal();

open("INFO", { message: "Hello!" });
open("HELP");
close("INFO");

// Type errors:
open("INFO");                     // Missing required props
open("INFO", { title: "Hello" }); // Expected message
open("UNKNOWN");                  // Not registered
```

## Stacking

Opening another modal keeps the existing modals mounted underneath it. Use `open` from inside a modal to add another on top, as in the example above. `pop()` reveals the previous modal with its local state preserved.

Each name can appear once in the stack. Calling `open` for an already open name updates its props and moves its entry to the end of the stack.

Clicking the backdrop or pressing Escape calls `pop()`. Clicking inside the content does not dismiss it. `AnimatePresence` keeps a closing modal mounted until its exit animation finishes.

## Provider props

| Prop | Default | Purpose |
| --- | --- | --- |
| `modals` | Required | Object mapping modal names to component functions. Only open components are rendered, with the props supplied to `open`. |
| `modalBackgroundColor` | `#ffffff` | Background color of every modal panel. |
| `modalBackdropColor` | `rgb(0 0 0 / 50%)` | Color of each full-screen backdrop. |
| `children` | — | Your app. |

```tsx
<ModalProvider
  modals={modals}
  modalBackgroundColor="#ffffff"
  modalBackdropColor="rgb(0 0 0 / 50%)"
>
  <App />
</ModalProvider>
```

Colors accept CSS background color values. They are also available from `useModal()` as `modalBackgroundColor` and `modalBackdropColor`.

## Modal component

`Modal` renders a backdrop and content panel as divs, portaled directly into `document.body` after client mounting. The backdrop fills the viewport and centers the panel. The default appearance is a white panel over 50% black, with no built-in padding, width, rounded corners, or close button.

`className`, `style`, children, and other HTML div attributes apply to the panel. A panel's `style.backgroundColor` overrides the provider's default. Supply `aria-label` or `aria-labelledby` to name the dialog.

Motion animates the backdrop and panel in and out over 100ms. The panel fades in, scales from `0.96` to `1`, and moves upward by `12px` with ease-out timing; closing reverses this. Exiting modals ignore pointer interaction.

`Modal` and `useModal` must be used within `ModalProvider`.
