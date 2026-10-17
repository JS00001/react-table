# Toast

[All components](../README.md#choose-a-component)

## Setup

1. Install the package and Motion 12:

   ```sh
   npm install @sencorp/react-ui "motion@^12.23.0"
   ```

2. Wrap your app in `ToastProvider`.
3. Call `useToast()` beneath the provider.
4. Call `open(content)` to show a toast at the bottom right.

## Complete example

```tsx
import { ToastProvider, useToast } from "@sencorp/react-ui/toast";

function Page() {
  const { open, close } = useToast();

  return (
    <button
      type="button"
      onClick={() => open(
        <div>
          <strong>Saved</strong>
          <p>Your changes have been saved.</p>
          <button type="button" onClick={close}>Dismiss</button>
        </div>,
      )}
    >
      Save changes
    </button>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  );
}
```

## Show and dismiss

| Method | Usage |
| --- | --- |
| `open(content, options?)` | Show text or React content. A new toast replaces the current toast and appears above it during the transition. |
| `close()` | Dismiss the current toast. |

Toasts dismiss automatically after four seconds. Set `duration` in milliseconds for a different timeout, or use `0` to keep a toast open until you dismiss it.

```tsx
const { open, close } = useToast();

open("Changes saved.");
open("Please review your settings.", { duration: 6000 });
open("Waiting for your response.", { duration: 0 });
close();
```

## Customize one toast

Style your toast content with your own component, or pass `className` or `style` in the options. Add any background, text color, padding, width, border, and shadow you want:

```tsx
open("Could not save your changes.", {
  duration: 6000,
  className: "error-toast",
  style: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderRadius: 12,
  },
});
```

## Set defaults

| Provider prop | Default | Usage |
| --- | --- | --- |
| `duration` | `4000` | Default dismissal timeout in milliseconds. Use `0` for manual dismissal. |
| `toastClassName` | — | CSS classes for all toasts. |
| `toastStyle` | — | Styles for all toasts. |
| `children` | — | Your app. |

```tsx
<ToastProvider
  duration={5000}
  toastClassName="app-toast"
  toastStyle={{ backgroundColor: "#111827", color: "#ffffff" }}
>
  <App />
</ToastProvider>
```

Options passed to `open` override provider defaults. Add your own content and action buttons as needed. Toasts enter and exit with a short fade and vertical slide.
