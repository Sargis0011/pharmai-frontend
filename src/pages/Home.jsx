import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { fetchCategories, fetchMedicines, fetchStats, pickLocalized, smartSearch } from '../api'
import FavoriteButton from '../components/FavoriteButton'

function useDebounced(value, delay = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')
  const dq = useDebounced(q, 250)

  const [data, setData] = useState({ total: 0, items: [] })
  const [cats, setCats] = useState([])
  const [stats, setStats] = useState({ medicines: 0, pharmacies: 0, categories: 0 })
  const [loading, setLoading] = useState(false)
  const [smart, setSmart] = useState(null)

  useEffect(() => { fetchCategories().then(setCats).catch(() => {}) }, [])
  useEffect(() => { fetchStats().then(setStats).catch(() => {}) }, [])

  const reqId = useRef(0)
  const resultsRef = useRef(null)
  const mountedRef = useRef(false)
  useEffect(() => {
    const id = ++reqId.current
    setLoading(true)
    setSmart(null)
    fetchMedicines({ q: dq || undefined, category, limit: 60 })
      .then(async (d) => {
        if (id !== reqId.current) return
        setData(d)
        if (dq && d.total === 0) {
          try {
            const s = await smartSearch(dq, lang)
            if (id === reqId.current) setSmart(s)
          } catch {}
        }
      })
      .finally(() => { if (id === reqId.current) setLoading(false) })
  }, [dq, category, lang])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    if (!resultsRef.current) return
    const el = resultsRef.current
    const top = el.getBoundingClientRect().top + window.scrollY - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }, [dq, category])

  const categoryOptions = useMemo(() => {
    return [{ key: 'all', count: stats.medicines }, ...cats]
  }, [cats, stats])

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-indigo-50/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="container-app py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            {t('brand')} · {t('tagline')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            {t('tagline')}
          </h1>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            {stats.medicines} · {t('list.total')}
          </p>
          <div className="max-w-2xl mx-auto relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full h-14 pl-12 pr-5 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_4px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(79,70,229,0.18)] focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition text-[15px]"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="mt-6 max-w-2xl mx-auto text-xs text-amber-900 bg-amber-50/80 border border-amber-200 rounded-xl px-4 py-2.5">
            ⓘ {t('disclaimer')}
          </div>
        </div>
      </section>

      <section ref={resultsRef} className="container-app py-10 scroll-mt-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryOptions.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`chip ${category === c.key ? 'chip-active' : ''}`}
            >
              {t(`categories.${c.key}`, { defaultValue: c.key })}
              <span className="opacity-70">{c.count}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-slate-500 mb-4">
          {loading ? t('list.loading') : `${t('list.total')}: ${data.total}`}
        </div>

        {data.items.length === 0 && !loading ? (
          <div className="card p-10 text-center text-slate-500">
            <div className="text-base mb-2">{t('list.empty')}</div>
            {smart && (smart.items?.length > 0 || smart.suggestions?.length > 0) && (
              <div className="mt-4 text-left">
                <div className="text-xs text-slate-400 mb-2">
                  {smart.status === 'fuzzy' ? '≈ ' : ''}
                  {smart.status === 'empty' ? t('list.empty') : ''}
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {[...(smart.items || []), ...(smart.suggestions || [])].slice(0, 9).map(m => (
                    <Link key={m.id} to={`/medicines/${m.id}`}
                      className="card card-hover p-4">
                      <div className="font-medium text-slate-900 text-sm">{pickLocalized(m, lang, 'name')}</div>
                      <div className="text-xs text-slate-500 italic">{m.active_substance}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((m) => {
              const name = pickLocalized(m, lang, 'name')
              return (
                <Link
                  to={`/medicines/${m.id}`}
                  key={m.id}
                  className="card card-hover p-5 group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {name}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {t(`categories.${m.category}`, { defaultValue: m.category })}
                      </span>
                      <FavoriteButton medicine={m} />
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 italic mb-3">
                    {m.active_substance}
                  </div>
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <div><span className="text-slate-400">{t('card.form')}:</span> {m.form || '—'}</div>
                    <div><span className="text-slate-400">{t('card.dosage')}:</span> {m.dosage || '—'}</div>
                    <div><span className="text-slate-400">{t('card.manufacturer')}:</span> {m.manufacturer || '—'}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
