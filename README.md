# back-kit

>A modern CLI tool for scaffolding end-to-end projects with best practices and customizable configurations
ye copy hai think about new description
---

## Architecture

- You can review the high-level architecture for this project here: [Architecture document](https://docs.google.com/document/d/1g05vn2QNPAdd9xbLnxHW7b_bGnp6ZsOWnI8sk-DScOc/edit?usp=sharing) (kindly comment your suggestions or request editor access.)

---

## Getting Started

### Prerequisites

- `Node.js` ≥ v18
- `npm` ≥ v7
- (Optional) `Yarn` or `pnpm`

### Install Dependencies

```bash
# from the root of back-kit
npm install
```

### Development

Start all packages in watch/dev mode via Turbo:

```bash
npm run dev
```

Run the CLI directly (with `ts-node`):

```bash
# from the root
npm run dev -- hello <name>
# e.g.
npm run dev -- hello Amrit
```

### Build

Compile all packages in the correct order:

```bash
npm run build
```

### Lint & Type-Check

```bash
npm run lint       # ESLint across workspaces
npm run check-types # TypeScript checks
npm run format     # Prettier formatting
```

### Running the Compiled CLI

```bash
# build first (if not already done)
npm run build
node packages/cli/dist/index.js hello YourName
```

Or install/link globally:

```bash
cd packages/cli
npm link
my-cli hello YourName
```

---

## Repo Structure

```text
/back-kit
├─ packages/
│  ├─ cli/                # CLI tool (yargs + ts-node + build)
│  ├─ eslint-config/      # Shared ESLint configs (base, Next.js, React)
│  ├─ typescript-config/  # Shared tsconfig presets
│  └─ ui/                 # React component library (button, card, code)
│     └─ turbo/           # Custom code generators (Handlebars templates)
├─ apps/                  # (future) application examples
├─ turbo.json             # Task orchestration
└─ README.md
```

---

## Contributing

1. Fork the repo & clone
2. Create a feature branch
3. Run tests/linting before pushing
4. Open a PR and tag @maintainers

---

## License

MIT
