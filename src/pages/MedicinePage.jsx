import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  fetchAnalogs, fetchMedicine, pickLocalized,
} from '../api'
import FavoriteButton from '../components/FavoriteButton'

function Section({ title, children }) {
  return (
    <section className="card p-6">
      <h2 className="section-title mb-3">{title}</h2>
      <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
    </section>
  )
}

function List({ items, empty }) {
  if (!items || items.length === 0) {
    return <span className="text-slate-400 italic">{empty}</span>
  }
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((s, i) => <li key={i}>{s}</li>)}
    </ul>
  )
}

export default function MedicinePage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const [med, setMed] = useState(null)
  const [analogs, setAnalogs] = useState([])

  useEffect(() => {
    setMed(null); setAnalogs([])
    fetchMedicine(id).then(setMed).catch(() => setMed(null))
    fetchAnalogs(id).then(setAnalogs).catch(() => setAnalogs([]))
  }, [id])

  if (!med) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4 animate-pulse">
        <div className="h-4 w-24 bg-slate-200/70 rounded" />
        <div className="h-32 bg-slate-200/70 rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-4">
          {[0,1,2,3].map(i => <div key={i} className="h-24 bg-slate-200/70 rounded-2xl" />)}
        </div>
      </div>
    )
  }

  const name = pickLocalized(med, lang, 'name')
  const description = med.description?.[lang] || med.description?.en || med.description?.ru || ''
  const indications = med.indications?.[lang] || med.indications?.en || med.indications?.ru || ''
  const noData = t('details.none')

  const toList = (v) => {
    if (!v) return []
    if (Array.isArray(v)) return v
    if (typeof v === 'object') return v[lang] || v.en || v.ru || []
    return []
  }
  const side = toList(med.side_effects)
  const contra = toList(med.contraindications)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-indigo-700 hover:text-indigo-800 font-medium">
        <span aria-hidden>←</span> {t('details.back')}
      </Link>

      <header className="card p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{name}</h1>
            <p className="text-slate-500 italic mt-1">{med.active_substance}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
              {t(`categories.${med.category}`, { defaultValue: med.category })}
            </span>
            <FavoriteButton medicine={med} size="lg" />
          </div>
        </div>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
          {[
            ['form', med.form],
            ['dosage', med.dosage],
            ['manufacturer', med.manufacturer],
            ['country', med.country],
          ].map(([k, v]) => (
            <div key={k} className="surface-muted p-3">
              <dt className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{t(`card.${k}`)}</dt>
              <dd className="text-slate-800 mt-0.5">{v || '—'}</dd>
            </div>
          ))}
        </dl>
      </header>

      {description && (
        <Section title={t('details.description')}>{description}</Section>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Section title={t('details.indications')}>
          {indications || <span className="text-slate-400 italic">{noData}</span>}
        </Section>
        <Section title={t('details.side')}>
          <List items={side} empty={noData} />
        </Section>
        <Section title={t('details.contra')}>
          <List items={contra} empty={noData} />
        </Section>
        {med.variants && med.variants.length > 0 && (
          <Section title={t('details.variants')}>
            <ul className="space-y-1">
              {med.variants.map(v => (
                <li key={v.id} className="text-sm">
                  <span className="font-medium">{v.form || '—'}</span>
                  {v.dosage && <span className="text-slate-500"> · {v.dosage}</span>}
                  {v.package_info && <span className="text-slate-400"> · {v.package_info}</span>}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      <Section title={t('details.analogs')}>
        {analogs.length === 0 ? (
          <span className="text-slate-400 italic">{noData}</span>
        ) : (
          <ul className="divide-y divide-slate-100">
            {analogs.map(a => {
              const an = pickLocalized(a, lang, 'name')
              return (
                <li key={a.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <Link to={`/medicines/${a.id}`} className="font-medium text-indigo-700 hover:underline">{an}</Link>
                    <div className="text-xs text-slate-500">{a.manufacturer} · {a.dosage}</div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{a.form}</span>
                </li>
              )
            })}
          </ul>
        )}
      </Section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
        {t('disclaimer')}
      </div>
    </div>
  )
}
