# PharmAI frontend (React + Vite + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

Откроется на http://localhost:5173, запросы `/api/*` проксируются на FastAPI (`http://127.0.0.1:8000`).

## Что внутри
- `src/i18n.js` — RU / HY / EN UI-переводы (только UI, данные из БД хранятся отдельно)
- `src/api.js` — клиент REST + хелпер `pickLocalized(obj, lang, 'name')` для выбора локализованного поля
- `src/pages/Home.jsx` — поиск (backend-side, debounce 250 мс) + фильтр категорий
- `src/pages/MedicinePage.jsx` — карточка с разделами Описание / Назначение / Побочные эффекты / Противопоказания / Аптеки / Аналоги
- `src/pages/Pharmacies.jsx` — список аптек (только название, без адресов)
