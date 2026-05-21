import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home'
import MedicinePage from './pages/MedicinePage'
import Pharmacies from './pages/Pharmacies'
import About from './pages/About'
import Admin from './pages/Admin'
import Favorites from './pages/Favorites'
import { useFavorites } from './hooks/useFavorites'

function LangSwitcher() {
  const { i18n, t } = useTranslation()
  const langs = ['hy', 'ru', 'en']
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-slate-100 border border-slate-200/80">
      {langs.map(l => (
        <button
          key={l}
          onClick={() => i18n.changeLanguage(l)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide transition ${
            i18n.language === l
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          title={t(`lang.${l}`)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function FavoritesNavLink({ navCls }) {
  const { t } = useTranslation()
  const { count } = useFavorites()
  return (
    <NavLink to="/favorites" className={navCls}>
      <span className="inline-flex items-center gap-1.5">
        {t('nav.favorites')}
        {count > 0 && (
          <span className="ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-indigo-600 text-white text-[11px] font-semibold leading-none">
            {count}
          </span>
        )}
      </span>
    </NavLink>
  )
}

export default function App() {
  const { t } = useTranslation()
  const navCls = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-20">
        <div className="container-app h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white grid place-items-center font-bold shadow-sm shadow-indigo-500/20 group-hover:shadow-md transition">
              P
            </span>
            <div className="leading-tight">
              <div className="font-semibold text-slate-900 tracking-tight">{t('brand')}</div>
              <div className="text-[11px] text-slate-500">{t('tagline')}</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navCls}>{t('nav.home')}</NavLink>
            <NavLink to="/pharmacies" className={navCls}>{t('nav.pharmacies')}</NavLink>
            <FavoritesNavLink navCls={navCls} />
            <NavLink to="/about" className={navCls}>{t('nav.about')}</NavLink>
          </nav>
          <LangSwitcher />
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines/:id" element={<MedicinePage />} />
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200/70 bg-white/60 backdrop-blur">
        <div className="container-app py-6 text-sm text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} PharmAI</span>
          <span className="text-xs text-slate-400">FastAPI · React · SQLite</span>
        </div>
      </footer>
    </div>
  )
}
