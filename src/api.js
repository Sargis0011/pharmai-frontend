import axios from 'axios'

export const api = axios.create({ baseURL: 'https://pharmai-backend-production.up.railway.app' })

export const fetchMedicines = (params) => api.get('/medicines', { params }).then(r => r.data)
export const fetchMedicine  = (id) => api.get(`/medicines/${id}`).then(r => r.data)
export const fetchAnalogs   = (id) => api.get(`/analogs/${id}`).then(r => r.data)
export const fetchCategories = () => api.get('/medicines/categories').then(r => r.data)
export const fetchStats      = () => api.get('/medicines/stats').then(r => r.data)
export const fetchPharmaciesForMedicine = (id) => api.get(`/pharmacies/medicine/${id}`).then(r => r.data)
export const fetchAllPharmacies = () => api.get('/pharmacies').then(r => r.data)
export const fetchPharmacyChains = () => api.get('/pharmacy-chains').then(r => r.data)
export const fetchPharmacyChain = (id) => api.get(`/pharmacy-chains/${id}`).then(r => r.data)

// Smart fallback search: exact -> alias -> fuzzy -> empty(+suggestions)
export const smartSearch = (q, language) =>
  api.get('/search/smart', { params: { q, language } }).then(r => r.data)

// Admin / CMS
export const adminListMedicines = (params) => api.get('/admin/medicines', { params }).then(r => r.data)
export const adminCreateMedicine = (payload) => api.post('/admin/medicines', payload).then(r => r.data)
export const adminUpdateMedicine = (id, payload) => api.patch(`/admin/medicines/${id}`, payload).then(r => r.data)
export const adminDeleteMedicine = (id) => api.delete(`/admin/medicines/${id}`).then(r => r.data)

export const adminListCategories = () => api.get('/admin/categories').then(r => r.data)
export const adminCreateCategory = (payload) => api.post('/admin/categories', payload).then(r => r.data)
export const adminDeleteCategory = (id) => api.delete(`/admin/categories/${id}`).then(r => r.data)

export const adminListAliases = () => api.get('/admin/aliases').then(r => r.data)
export const adminCreateAlias = (payload) => api.post('/admin/aliases', payload).then(r => r.data)
export const adminDeleteAlias = (id) => api.delete(`/admin/aliases/${id}`).then(r => r.data)

export const adminListUnknown = () => api.get('/admin/unknown-searches').then(r => r.data)
export const adminDeleteUnknown = (id) => api.delete(`/admin/unknown-searches/${id}`).then(r => r.data)

export const adminImportFile = (file) => {
  const fd = new FormData()
  fd.append('file', file)
  return api.post('/admin/import', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data)
}

/**
 * Picks the right localized field from a DB record.
 * Falls back through hy -> en -> ru to avoid empty UI.
 */
export function pickLocalized(obj, lang, base) {
  if (!obj) return ''
  const order = [lang, 'en', 'hy', 'ru']
  for (const l of order) {
    const v = obj[`${base}_${l}`] ?? obj?.[base]?.[l]
    if (v) return v
  }
  return ''
}
