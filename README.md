![Sencorp React UI](https://cdn.sencorpllc.com/sencorp-react-ui.png)

# @sencorp/react-ui

Commonly used React UI components, ready to customize with your own design system.

## Install

```sh
npm install @sencorp/react-ui motion
```

Requires React 18 or 19. Modals and sidebars use Motion 12.23 or newer within version 12, supplied by your app as a peer dependency. Import each component family from its own path:

```tsx
import { Table, useTable } from "@sencorp/react-ui/table";
import "@sencorp/react-ui/table/styles.css";
```

## Components

| Component | Import path | Documentation | Status |
| --- | --- | --- | --- |
| Table | `@sencorp/react-ui/table` | [Usage, props, and examples](docs/table.md) | Available |
| Modal | `@sencorp/react-ui/modal` | [Usage, props, and examples](docs/modal.md) | Available |
| Sidebar | `@sencorp/react-ui/sidebar` | [Usage, props, and examples](docs/sidebar.md) | Available |

## Modals

Register your modal components with `ModalProvider` at the root of your app, then create a typed wrapper around `useModal<typeof modals>()`. Open components with their own props, stack them, and close them with `close`, `pop`, or `closeAll`.

See the [modal API and complete setup example](docs/modal.md) for the provider, hook, component styling, and backdrop behavior.

## Add a component family

Each family lives in `src/<family>/index.ts`, with documentation in `docs/<family>.md`. Add its entry to `tsup.config.ts`, its public import path to `package.json` exports, and a link above. Give any stylesheet its own export, following `@sencorp/react-ui/table/styles.css`.

## Run the demo

Use Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed in your terminal. Edit `playground/main.tsx` to try changes.

## Publish

Sign in with `npm login`, update the version in `package.json`, then run:

```sh
npm run release
```

This builds the library and publishes it publicly to npm. The playground and Tailwind are excluded from the package build.
