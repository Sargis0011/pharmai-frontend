import { useTranslation } from 'react-i18next'
import { useFavorites } from '../hooks/useFavorites'

export default function FavoriteButton({ medicine, size = 'md', className = '' }) {
  const { t } = useTranslation()
  const { isFavorite, toggle } = useFavorites()
  if (!medicine || medicine.id == null) return null

  const active = isFavorite(medicine.id)
  const dims = size === 'lg' ? 'w-10 h-10 text-xl' : 'w-9 h-9 text-base'

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(medicine)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? t('favorites.remove') : t('favorites.add')}
      title={active ? t('favorites.remove') : t('favorites.add')}
      className={`grid place-items-center rounded-full border transition-all duration-150 shrink-0 active:scale-95 ${dims} ${
        active
          ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
          : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
      } ${className}`}
    >
      <span aria-hidden="true">{active ? '♥' : '♡'}</span>
    </button>
  )
}
