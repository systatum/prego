# Prego - Frontend Monorepo Web Homepage w/ Tina 🦙

`Prego` is a unified frontend monorepo developed and maintained by `Systatum`, designed to manage multiple business-related web applications. Built with Turbo Repo, this monorepo supports applications using modern frameworks such as `Next.js, Astro, Hugo, etc.` It leverages shadcn/ui for consistent UI components and integrates `TinaCMS` for streamlined content management via a `WYSIWYG Markdown editor`.

## Included Applications

Prego currently include different web apps:

- Systatum Homepage
- Workaty Homepage
- Dashtomer Homepage

## Project Structure

The monorepo is organized as follows:

- `apps/`: Contains Next.js applications.
  - `apps/systatum`: Main application for Systatum Homepage
  - `apps/workaty`: Main application for Workaty Homepage
  - `apps/dashtomer`: Main application for Dashtomer Homepage

## Tech Stack

- **Framework Management**: Turbo Repo
- **Framework Web**: NextJS 15.3.1
- **Package Manager**: pnpm
- **Headless CMS**: Tina CMS
- **UI Components**: shadcn/ui (Headless components)
- **Icon Components**: remix icon
- **Styling**: Tailwind CSS
- **Authentication**: Zustand (manual for now)
- **TypeScript**: For type code code safer, more readable, and easier to maintain.

## Key Features

- Live blog editing using TinaCMS's visual editor
- Seamless content commits via Tina without opening GitHub
- Full support for MDX content
- CMS is scoped per app (due to Tina’s GraphQL architecture)
- Strict development conventions and consistent styling across apps

### Prerequisites

- Node.js 18+
- pnpm 8+

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd prego
   ```

2. Install dependencies:

   ```bash
   pnpm install or npm install
   ```

3. Navigate to the app you want to run

```bash
 cd apps/[app-name]
```

4. Run development server

- With TinaCMS (admin interface):

```bash
pnpm dev
```

- Without TinaCMS (basic site only):

```bash
pnpm dev-local
```

5. Then browser at http://localhost:3000

⚠️ Note: TinaCMS `only supports one app at a time due to` its GraphQL design. You must `cd` into the correct app directory first.

### Local URLs

- http://localhost:3000 : Main site preview (varies by app, depends on your framework)
- http://localhost:3000/admin : TinaCMS editor interface
- http://localhost:3000/exit-admin : Exit TinaCMS admin mode
- http://localhost:4001/altair/ : GraphQL playground to test queries and browse the API documentation

## Environtment Variables

you must need environtment variable like this on your app

1. NEXT_PUBLIC_TINA_CLIENT_ID=\*\*\* -> Obtain from your `Tina Cloud` account from app.tina.io
2. TINA_TOKEN=\*\*\* -> `Read-only token` from Tina Cloud (no write/search permissions in production)require editable access or search
3. ACTIVE_PROJECT -> The `active project` name (e.g., `workaty`)
4. NEXT_PUBLIC_TINA_BRANCH=main -> Branch used for indexing (e.g., main)
5. VERCEL_ENV=preview -> Deployment environment (e.g., preview)
6. NEXT_PUBLIC_TINA_MODE=admin -> For show about Tina Admin Panel

## Building for Production

1. Authorize your GitHub account in `Tina Cloud` on `app.tina.io`.
2. In tina/config.ts, ensure:
   - The correct GitHub branch is used
   - Indexing is enabled in `Tina Cloud`
   - The ACTIVE_PROJECT value matches your target app
3. Set all required environment variables.
4. Build the application:
   - Homepage only
   ```bash
   pnpm build-homepage
   ```
   - Homepage + admin panel
   ```bash
   pnpm build-admin
   ```

⚠️ Note: Check your root build on your deployment app, also on tina advance view root

### Pages

- `/` - Home page
- `/blog` - Blog listing page
- `/blog/[your-markdown].mdx` - Individual blog post page

## Development Commands

- `pnpm dev`: Run development server with TinaCMS
- `pnpm dev-local`: Run development server just your
- `pnpm build-admin`: Build for production with TinaCMS
- `pnpm build-homepage`: Build for production just homepage
- `pnpm lint`: Run linter with Biome and EsLint/NextLint

### Guidelines

- `Use English` only for all documentation, UI copy, and comments.
- `Prioritize component reuse.` Avoid duplicating components unnecessarily.

### Git Branch Naming

- `feature/feature-name`: New feature
- `fix/bug-name`: Bug fix
- `improvement/improvment-name`: Enchancements or refactors
- `chore/task-name`: Maintenance or tooling chnages
- `docs/doc-name`: Documentation updates

### Commit Messages

- Use imperative mood ("Add" not "Added") and capitalize the first letter
- Keep commits focused on a single change
- Use descriptive messages that explain what the change does

Examples of good commit messages:

- `Add index page`
- `Fix authentication error`
- `Update dashboard layout`
- `Enable dark mode`

### Pull Requests

- PR names should follow the format: `[Type] Description`
  - Example: `[Feature] [APP:NUMBER_ISSUE]:Setup monorepo`
- Avoid grouping big changes into one commit
- Each PR should have a clear purpose
