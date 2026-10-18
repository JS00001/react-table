# Toast

[All components](../README.md#choose-a-component)

## Setup

1. Install the package and Motion 12:

   ```sh
   npm install @sencorp/react-ui "motion@^12.23.0"
   ```

2. Mount one `ToastProvider` at your app root to render toasts.
3. Import `toast` and call `toast.show(content)` from any component or regular function. The caller does not need to be inside the provider.

Toast state is shared across the app. A call made before the provider mounts is displayed when it mounts. Call these methods in the browser, such as in event handlers or after a request completes.

## Complete example

```tsx
import { ToastProvider, toast } from "@sencorp/react-ui/toast";

function Page() {
  return (
    <button
      type="button"
      onClick={() => toast.show(
        <div>
          <strong>Saved</strong>
          <p>Your changes have been saved.</p>
          <button type="button" onClick={toast.close}>Dismiss</button>
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
| `toast.show(content, options?)` | Show text or React content. A new toast replaces the current toast and appears above it during the transition. |
| `toast.close()` | Dismiss the current toast. |

Toasts dismiss automatically after four seconds. Set `duration` in milliseconds for a different timeout, or use `0` to keep a toast open until you dismiss it.

```tsx
import { toast } from "@sencorp/react-ui/toast";

toast.show("Changes saved.");
toast.show("Please review your settings.", { duration: 6000 });
toast.show("Waiting for your response.", { duration: 0 });
toast.close();
```

## Customize one toast

Style your toast content with your own component, or pass `className` or `style` in the options. Add any background, text color, padding, width, border, and shadow you want:

```tsx
toast.show("Could not save your changes.", {
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

Options passed to `toast.show` override provider defaults. Add your own content and action buttons as needed. Toasts enter and exit with a short fade and vertical slide.

## Existing hook usage

`useToast()` remains available beneath `ToastProvider`. Its `open` and `close` methods use the same shared toast state as `toast.show()` and `toast.close()`.
