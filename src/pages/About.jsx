import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  const features = t('about.features', { returnObjects: true }) || []
  const stack = [
    'FastAPI + SQLite (Python)',
    'React + Vite + TailwindCSS',
    'react-i18next (HY / RU / EN)',
    'RapidFuzz · transliteration-aware search',
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <header>
        <div className="inline-block text-[11px] uppercase tracking-[0.18em] text-indigo-700 font-semibold mb-3 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100">
          {t('about.diploma')}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">{t('about.title')}</h1>
        <p className="text-slate-700 leading-relaxed">{t('about.body')}</p>
      </header>

      <section className="card p-6 md:p-7">
        <h2 className="section-title mb-4">{t('about.features_title')}</h2>
        <ul className="text-sm text-slate-700 space-y-2.5">
          {Array.isArray(features) && features.map((f, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-0.5 w-5 h-5 grid place-items-center rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold shrink-0">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6 md:p-7">
        <h2 className="section-title mb-4">{t('about.stack_title')}</h2>
        <ul className="text-sm text-slate-600 grid sm:grid-cols-2 gap-y-2 gap-x-4">
          {stack.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              {s}
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
        {t('disclaimer')}
      </div>
    </div>
  )
}
