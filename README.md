# Prego - Frontend Monorepo Web Homepage w/ Tina 🦙

Prego is a business management platform built using Turbo Monorepo and we can manage for all apps with another framework, ie Next JS, Astro, Hugo, etc. This project uses shadcn UI for consistent and modern components.

For content management, TinaCMS is integrated, allowing you to manage blog content directly via `/admin` (`WYSIWYG` editor using MDX files).

## Included Applications

Prego includes 4 different web apps:

- Systatum Homepage
- Workaty Homepage
- Plutask Homepage
- Dashtomer Homepage

## Project Structure

The monorepo is organized as follows:

- `apps/`: Contains Next.js applications.
  - `apps/systatum`: Main application for Systatum Homepage
  - `apps/workaty`: Main application for Workaty Homepage
  - `apps/dashtomer`: Main application for Dashtomer Homepage
  - `apps/plutask`: Main application for Plutask Homepage

## Tech Stack

- **Framework Management**: Turbo Monorepo
- **Framework Web**: NextJS 15.3.1
- **Package Manager**: pnpm
- **Headless CMS**: Tina CMS
- **UI Components**: shadcn/ui (Headless components)
- **Icon Components**: remix icon
- **Styling**: Tailwind CSS
- **Authentication**: Zustand (manual for now)
- **TypeScript**: For type code code safer, more readable, and easier to maintain.

## Key Features

- Live Blog Editing with TinaCMS (WYSIWYG interface)
- No need to open GitHub: TinaCMS handles commits from the editor
- Support for MDX content
- One CMS per app due to Tina's GraphQL constraints

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone repository

   ```bash
   git clone <repository-url>
   cd prego
   ```

2. Install dependencies

   ```bash
   pnpm install or npm install
   ```

3. Run development server

   ```bash
   pnpm dev or npm run dev
   ```

4. Then browser at http://localhost:3000

### Local URLs

- http://localhost:3000 or etc (that's not always same, depends on your framework) : browse the website
- http://localhost:3000/admin : connect to Tina Cloud and go in edit mode
- http://localhost:3000/exit-admin : log out of Tina Cloud
- http://localhost:4001/altair/ : GraphQL playground to test queries and browse the API documentation

## Development Setup

1. The first is you must move to app you want

```bash
  cd apps/[your-app]
```

2. The second is you must install with pnpm to install ur node modules (for running on locally)

```bash
 pnpm install
```

3. The third is you can run with Tina or not
   if with Tina

```bash
 pnpm dev
```

else you want not w/ tina

```bash
 pnpm dev-local
```

⚠️ Note: TinaCMS `only supports one app at a time due to` its GraphQL design. You must `cd` into the correct app directory first.

## Environtment Variables

you must need environtment variable like this on your app

1. NEXT_PUBLIC_TINA_CLIENT_ID=\*\*\* `You can get on your app.tina.io account (cliend id).`
2. TINA_TOKEN=\*\*\* `You can get this from your app.tina.io account. Make sure to use a read-only token, since production doesn't require editable access or search features before authorization.)`
3. ACTIVE_PROJECT -> this is `active project` what you want, example is `workaty`
4. NEXT_PUBLIC_TINA_BRANCH=main -> this is branch what you want
5. VERCEL_ENV=preview -> this is just preview

## Building for Production

1. Make sure your GitHub account is authorized on `app.tina.io`.
2. In tina/config.ts, configure the indexing based on your GitHub branch (e.g., `main`) — and ensure the "index" option is checked.
3. In the same file, set the project name to match the `ACTIVE_PROJECT` environment variable, since this is needed to identify the correct collection in a monorepo setup.
4. Add the required environment variables as listed in the `Environment Variables` section above.
5. To build the project, use `pnpm build-homepage` for the static homepage only. If you need to include the admin interface, use `pnpm build-admin`.

Notes:

- Check your root build on your deployment app, also on tina advance view root

### Pages

- `/` - Home page
- `/blog` - Blogs page
- `/blog/[your-markdown.mdx]` - Blog page

## Commands

- `pnpm dev`: Run development server with TinaCMS
- `pnpm dev-local`: Run development server just your
- `pnpm build-admin`: Build for production with TinaCMS
- `pnpm build-homepage`: Build for production just homepage
- `pnpm lint`: Run linter with Biome and EsLint/NextLint

### General Guidelines

- **English Only**: All code comments, documentation, and UI text must be in English
- **Component Reuse**: Always check existing components before creating new ones

### Branch Naming

- `feature/feature-name`: For new features
- `fix/bug-name`: For bug fixes
- `chore/task-name`: For maintenance tasks
- `docs/doc-name`: For documentation updates
- `improvement/improvment-name`: For improvement update

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
