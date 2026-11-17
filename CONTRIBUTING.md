# Contributing Guide

Thank you for checking out **arya-portfolio**! Whether you are fixing a bug, improving accessibility, or forking this project as a reference for your own portfolio, the guidelines below explain how the repository is organized.

## Forking for Your Own Portfolio

You are free to fork and adapt the codebase under the [MIT License](./LICENSE). If you publish your own version, please replace:
1. Personal identity, links, and domain in `common/constants/metadata.ts`, `common/constants/about.ts`, `common/constants/carreers.ts`, `common/constants/education.ts`, and `common/constants/socialMedia.tsx`.
2. Localized biography and SEO copy in `messages/id.json` and `messages/en.json`.
3. Personal photos and CV files inside `public/`.

## Local Development Workflow

1. **Fork and clone** the repository, then create a feature branch from `main` using a descriptive prefix (`feat/`, `fix/`, `style/`, `chore/`):
   ```bash
   git checkout -b fix/short-topic-name
   ```
2. **Install dependencies** (`npm install` or `bun install`) and configure `.env.local` using the template in [README.md](./README.md#2-configure-environment-variables).
3. **Follow project conventions:**
   - **Feature-First Modules:** Group page-specific UI inside `modules/<feature>/components/` and keep shared primitives in `common/components/elements/`.
   - **Service Layer:** Keep external API calls and Supabase queries in `services/` rather than inside React components.
   - **Component Size & Typing:** Keep frontend components focused (`<= 300` lines), avoid `any` types, and use the `@/` path alias.
   - **Bilingual Copy:** Add user-facing strings to both `messages/en.json` and `messages/id.json`.
   - **Accessibility & Performance:** Use semantic HTML (`<button>`, `<a>`, `<search>`, `<label htmlFor>`), maintain visible `:focus-visible` states, and honor `prefers-reduced-motion`.
4. **Verify before opening a Pull Request:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```
5. **Never commit `.env` files, API keys, or personal tokens.**
