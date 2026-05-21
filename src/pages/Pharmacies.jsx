import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchPharmacyChains, fetchPharmacyChain } from '../api'

export default function Pharmacies() {
  const { t, i18n } = useTranslation()
  const [chains, setChains] = useState([])
  const [active, setActive] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const lang = i18n.language

  useEffect(() => {
    setLoading(true)
    fetchPharmacyChains()
      .then(setChains)
      .catch(() => setChains([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (active == null) { setDetail(null); return }
    setDetail(null)
    fetchPharmacyChain(active).then(setDetail).catch(() => setDetail(null))
  }, [active])

  const pickDesc = (c) =>
    c[`description_${lang}`] || c.description_en || c.description_ru || c.description_hy || ''

  if (active != null) {
    return (
      <div className="container-app py-10">
        <button onClick={() => setActive(null)}
          className="inline-flex items-center gap-1 text-sm text-indigo-700 hover:text-indigo-800 font-medium mb-6">
          <span aria-hidden>←</span> {t('pharmacies.back')}
        </button>
        {!detail ? (
          <div className="text-slate-500">{t('list.loading')}</div>
        ) : (
          <>
            <header className="card p-6 md:p-8 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{detail.name}</h1>
              {pickDesc(detail) && (
                <p className="text-slate-600 mt-2 max-w-2xl leading-relaxed">{pickDesc(detail)}</p>
              )}
              <div className="text-xs text-slate-500 mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {t('pharmacies.branches')}: {detail.branches?.length || 0}
              </div>
            </header>
            <ul className="grid md:grid-cols-2 gap-4">
              {(detail.branches || []).map(b => (
                <li key={b.id} className="card p-5">
                  <div className="font-semibold text-slate-900">{b.branch_name || b.city}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{b.city}</div>
                  <div className="text-sm text-slate-700 mt-3">{b.address}</div>
                  <div className="text-xs text-slate-500 mt-3 space-y-1">
                    {b.phone && <div>📞 {b.phone}</div>}
                    {b.working_hours && <div>🕐 {b.working_hours}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">{t('pharmacies.title')}</h1>
      <p className="text-sm text-slate-500 mb-8">{chains.length} {t('pharmacies.branches').toLowerCase()}</p>
      {loading ? (
        <div className="text-slate-500">{t('list.loading')}</div>
      ) : chains.length === 0 ? (
        <div className="card p-10 text-center text-slate-500">{t('list.empty')}</div>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chains.map(c => (
            <li key={c.id}>
              <button onClick={() => setActive(c.id)}
                className="w-full text-left card card-hover p-5">
                <div className="font-semibold text-slate-900">{c.name}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {c.branches_count} · {t('pharmacies.branches').toLowerCase()}
                </div>
                {pickDesc(c) && (
                  <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">{pickDesc(c)}</p>
                )}
                <div className="mt-4 text-xs text-indigo-700 font-semibold">{t('pharmacies.view')} →</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
