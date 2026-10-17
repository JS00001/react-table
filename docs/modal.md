![Sencorp React UI Modal](https://cdn.sencorpllc.com/sencorp-react-ui-documentation-modal.png)

# Modal

[All components](../README.md#components)

## Setup

1. Install the package and Motion 12:

   ```sh
   npm install @sencorp/react-ui "motion@^12.23.0"
   ```

2. Create each modal component using `Modal`. Declare the props you want to pass when opening it.
3. Add the components to a `modals` object, using a name for each key.
4. Create an app hook with `useLibraryModal<typeof modals>()`.
5. Wrap your app in `<ModalProvider modals={modals}>`.
6. Call your hook's `open` method with a modal name and its props.

## Complete example

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

// Create your app’s typed modal hook.
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

When organizing these into separate files, export `modals` from your component list and use `import type { modals } from "./modals"` in your hook file. Use your app hook in pages and modal components beneath the provider.

## Opening and closing

| Method | Behavior |
| --- | --- |
| `open(name, props)` | Open the registered component with its props. Required props must be supplied. If all props are optional, the props argument can be omitted. |
| `close(name)` | Close the named modal, even if it is underneath another modal. |
| `pop()` | Close the most recently opened modal. Does nothing if the stack is empty. |
| `closeAll()` | Close every open modal. |

Pass the props declared by the selected component:

```tsx
const { open, close } = useModal();

open("INFO", { message: "Hello!" });
open("HELP");
close("INFO");
```

## Stacking

Call `open` inside a modal to open another on top. Call `pop()` to close the top modal and return to the previous one, or `closeAll()` to dismiss them all.

Use a different name for each modal you want open at the same time. Opening an existing name updates its props and brings it to the top.

Press Escape or click the backdrop to close the top modal.

## Provider props

| Prop | Default | Purpose |
| --- | --- | --- |
| `modals` | Required | Your object of modal names and components. |
| `modalBackgroundColor` | `#ffffff` | Background color of every modal panel. |
| `modalBackdropColor` | `rgb(0 0 0 / 50%)` | Color of each full-screen backdrop. |
| `modalBackdropClassName` | — | CSS classes for the backdrop. |
| `children` | — | Your app. |

```tsx
<ModalProvider
  modals={modals}
  modalBackgroundColor="#ffffff"
  modalBackdropColor="rgb(0 0 0 / 50%)"
  modalBackdropClassName="blurred-backdrop"
>
  <App />
</ModalProvider>
```

Pass CSS color values to customize the panel and backdrop.

Add the backdrop class to your app's CSS:

```css
.blurred-backdrop {
  backdrop-filter: blur(4px);
}
```

## Modal component

Wrap your modal content in `Modal`. Set `className` or `style` to add width, padding, borders, and other panel styles. Add buttons for any actions or closing controls you need.

```tsx
<Modal
  className="my-modal"
  style={{ width: 400, padding: 24, borderRadius: 12 }}
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">My modal</h2>
  <button onClick={pop}>Close</button>
</Modal>
```

Use `aria-label` or `aria-labelledby` to name the modal. Set `style.backgroundColor` to override the provider's panel color for an individual modal.

Use `Modal` and your app's `useModal` hook beneath `ModalProvider`.
