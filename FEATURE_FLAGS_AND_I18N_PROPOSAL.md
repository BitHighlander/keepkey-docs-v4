# Proposal: Feature Flags & Translations for keepkey-docs (Nextra)

## Overview
This document proposes a robust, production-ready approach for implementing:
- **Feature Flags**: To allow in-progress documentation (drafts, WIP, or staged features) to be gated or hidden from general users.
- **Translations (i18n)**: To support multiple languages and locales in keepkey-docs, following best practices and Pioneer Guild principles.

---

## 1. Feature Flags & Prod/Dev Marking for Docs

### Motivation (Extended)
- Enable previewing or staging new docs/features to specific users or environments (e.g., internal, beta testers).
- Hide unfinished or sensitive docs from the public.
- Support A/B testing or phased rollouts of documentation.
- **Mark production-ready (prod) vs. in-progress (dev) articles for translation and publishing workflows.**

### Prod/Dev Marking Approaches
- **Per-file Frontmatter:**
  - Add a `prod: true` (or `prod: false`) flag in each `.mdx` file’s frontmatter.
  - Example:
    ```mdx
    ---
    title: Home
    prod: true
    ---
    ```
  - **Pros:** Status is close to the content, easy for authors to update.
  - **Cons:** Harder to batch process or get a global view.

- **Central JSON Registry:**
  - Maintain a `prod-articles.json` in the repo root or `/docs`, listing all prod-ready articles by path.
  - Example:
    ```json
    [
      "index.mdx",
      "troubleshooting.mdx",
      "about.mdx"
    ]
    ```
  - **Pros:** Easy for automation, batch updates, and CI checks.
  - **Cons:** Can get out of sync with file edits.

- **Recommendation:** Use **both**: require a `prod: true` frontmatter for human clarity, and generate/update `prod-articles.json` automatically as a source of truth for automation/skills.

### Technical Proposal (Feature Flags)
- **Config-driven flags**: Use a central config file (e.g., `featureFlags.ts` or `.json`) to define which docs/features are enabled.
- **MDX Components**: Create a `<FeatureFlag flag="flagName">...</FeatureFlag>` component to wrap content in MDX files.
- **Environment Awareness**: Flags can be toggled via environment variables, cookies, or user roles (for internal preview).
- **Prod/Dev Usage**: Only prod-marked docs are published, translated, or surfaced to users by default.

---

## 2. Translations (i18n) for Docs

### Motivation
- Enable previewing or staging new docs/features to specific users or environments (e.g., internal, beta testers).
- Hide unfinished or sensitive docs from the public.
- Support A/B testing or phased rollouts of documentation.

### Technical Proposal
#### Approach
- **Config-driven flags**: Use a central config file (e.g., `featureFlags.ts` or `.json`) to define which docs/features are enabled.
- **MDX Components**: Create a `<FeatureFlag flag="flagName">...</FeatureFlag>` component to wrap content in MDX files.
- **Environment Awareness**: Flags can be toggled via environment variables, cookies, or user roles (for internal preview).

#### Example Implementation
- `featureFlags.ts`:
  ```ts
  export const featureFlags = {
    newApiDocs: process.env.NEXT_PUBLIC_FEATURE_NEW_API_DOCS === 'true',
    betaSection: process.env.NEXT_PUBLIC_FEATURE_BETA_SECTION === 'true',
  };
  ```
- `components/FeatureFlag.tsx`:
  ```tsx
  import { featureFlags } from '../featureFlags';
  export function FeatureFlag({ flag, children }) {
    if (!featureFlags[flag]) return null;
    return <>{children}</>;
  }
  ```
- Usage in MDX:
  ```mdx
  <FeatureFlag flag="newApiDocs">
    ## 🚧 New API Docs (In Progress)
    ...
  </FeatureFlag>
  ```

#### Rollout Strategy
- Use `.env` or Vercel/Netlify environment variables to toggle flags per deployment.
- Optionally, extend to support user-based flags (via cookies or JWT roles) for internal previews.

#### Pioneer Principles
- **RELIABILITY**: Flags are config-driven and fail-closed (content hidden by default).
- **SECURITY**: No accidental leaks of WIP docs.
- **DOCUMENTATION**: All flags documented in `featureFlags.ts` and this guide.
- **SIMPLICITY**: No complex permissions system; just config and components.

---

## 2. Translations (i18n) for Docs

### Motivation
- Make keepkey-docs accessible to a global audience.
- Support community and partner translations.
- Enable locale-based routing and content selection.

### Technical Proposal
#### Approach
- **Nextra i18n**: Use Nextra’s built-in i18n support (if using Nextra 2.x+) or community best practices.
- **File Structure**: Organize docs by locale, e.g.:
  ```
  /pages
    /index.mdx
    /troubleshooting.mdx
    /es/index.mdx
    /es/troubleshooting.mdx
    /fr/index.mdx
  ```
- **Config**: Add `i18n` config to `next.config.js`:
  ```js
  module.exports = {
    i18n: {
      locales: ['en', 'es', 'fr'],
      defaultLocale: 'en',
    },
    // ...other config
  }
  ```
- **Locale Switcher**: Add a simple UI component for users to switch language (dropdown or menu).
- **MDX Frontmatter**: Optionally, add locale-specific metadata for SEO.

#### Example Locale Switcher
- `components/LocaleSwitcher.tsx`:
  ```tsx
  import { useRouter } from 'next/router';
  export function LocaleSwitcher() {
    const router = useRouter();
    return (
      <select
        value={router.locale}
        onChange={e => router.push(router.asPath, router.asPath, { locale: e.target.value })}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    );
  }
  ```

#### Best Practices
- Use a fallback (default) locale for missing translations.
- Encourage contributors to add/maintain translations via PRs.
- Use consistent keys/structure for translated docs.

#### Pioneer Principles
- **RELIABILITY**: Fallbacks and clear structure prevent broken links.
- **DOCUMENTATION**: Each locale is self-contained and easy to update.
- **SIMPLICITY**: No external i18n libraries unless needed; leverage Nextra/Next.js features.

---

## 3. Translation Automation Skill (for Production Docs)

### Purpose
- Automatically translate only articles marked as `prod: true` (via frontmatter and/or `prod-articles.json`) into all supported languages.
- Ensure only stable, reviewed content is surfaced to global users.
- Reduce translation churn by ignoring dev/WIP docs.

### How It Works
- The skill scans all `.mdx` files (recursively) in `/pages`.
- For each file, it checks for `prod: true` in frontmatter (and/or presence in `prod-articles.json`).
- If prod, the skill uses an approved translation API (e.g., DeepL, Google Translate, OpenAI) to generate/refresh `.mdx` files in each language subdirectory.
- The skill can be run manually or as part of CI/CD, and logs/report which docs were translated or skipped.

### Supported Languages
- English (`en`)
- Español (`es`)
- Deutsch (`de`)
- Français (`fr`)
- Italiano (`it`)
- 日本語 (`ja`)
- 한국어 (`ko`)
- Polski (`pl`)
- Português (`pt`)
- 中文 (`zh`)

### Best Practices
- All translation files should retain frontmatter and update `prod` status as needed.
- Placeholder files are created for missing translations.
- Manual review is recommended for high-value docs after auto-translation.

---

## Next Steps
1. Review and approve this proposal.
2. Implement `featureFlags.ts` and `<FeatureFlag />` component; update MDX usage.
3. Update `next.config.js` for i18n; restructure `/pages` as needed.
4. Add `LocaleSwitcher` to the site header or sidebar.
5. Add `prod: true` frontmatter to production-ready docs; generate `prod-articles.json` for automation.
6. Implement and test the translation automation skill.
7. Document all flags and supported locales in `/docs`.
8. Encourage team/community to use flags for WIP and contribute translations.

---

## References
- [Nextra Docs: Internationalization](https://nextra.site/docs/docs/internationalization)
- [Next.js Docs: i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Pioneer Guild Guidelines](../../docs/cursor_rules/environment-variables.md)

---

_Last updated: 2025-05-07_
