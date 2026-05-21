import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { pickLocalized } from '../api'
import { useFavorites } from '../hooks/useFavorites'
import FavoriteButton from '../components/FavoriteButton'

export default function Favorites() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { items, clear } = useFavorites()

  return (
    <div className="container-app py-10">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {t('favorites.title')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {items.length > 0
              ? `${t('list.total')}: ${items.length}`
              : t('favorites.subtitle')}
          </p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="btn-ghost">
            {t('favorites.clear')}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 grid place-items-center rounded-2xl bg-rose-50 text-rose-500 text-3xl">
            ♡
          </div>
          <div className="text-lg font-semibold text-slate-800 mb-1">
            {t('favorites.empty.title')}
          </div>
          <div className="text-sm text-slate-500 mb-6">
            {t('favorites.empty.hint')}
          </div>
          <Link to="/" className="btn-primary">
            {t('favorites.empty.cta')}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => {
            const name = pickLocalized(m, lang, 'name')
            return (
              <Link
                to={`/medicines/${m.id}`}
                key={m.id}
                className="card card-hover p-5 group relative"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {name}
                  </h3>
                  <FavoriteButton medicine={m} />
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
    </div>
  )
}
