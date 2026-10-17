![Sencorp React UI](https://cdn.sencorpllc.com/sencorp-react-ui.png)

# @sencorp/react-ui

Commonly used React UI components. These are un-styled components, ready to be used with your own design system.

## Install

```sh
npm install @sencorp/react-ui
```

Requires React 18 or 19. Import each component family from its own path:

```tsx
import { Table, useTable } from "@sencorp/react-ui/table";
import "@sencorp/react-ui/table/styles.css";
```

## Components

| Component | Import path | Documentation | Status |
| --- | --- | --- | --- |
| Table | `@sencorp/react-ui/table` | [Usage, props, and examples](docs/table.md) | Available |
| Modal | `@sencorp/react-ui/modal` | [Usage, props, and examples](docs/modal.md) | Available |

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
