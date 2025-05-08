import { useRouter } from 'next/router';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'pl', label: 'Polski' },
  { code: 'pt', label: 'Português' },
  { code: 'zh', label: '中文' },
];

export function LocaleSwitcher() {
  const router = useRouter();
  return (
    <select
      value={router.locale}
      onChange={e => router.push(router.asPath, router.asPath, { locale: e.target.value })}
      style={{ margin: '0 1rem', padding: '0.25rem', borderRadius: 4 }}
      aria-label="Select language"
    >
      {LANGUAGES.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
