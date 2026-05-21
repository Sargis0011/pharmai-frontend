import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'pharmai_favorites'
const EVENT = 'pharmai:favorites-changed'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    window.dispatchEvent(new CustomEvent(EVENT))
  } catch {}
}

export function useFavorites() {
  const [items, setItems] = useState(() => readStorage())

  useEffect(() => {
    const sync = () => setItems(readStorage())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const isFavorite = useCallback(
    (id) => items.some((m) => String(m.id) === String(id)),
    [items]
  )

  const add = useCallback((medicine) => {
    if (!medicine || medicine.id == null) return
    const current = readStorage()
    if (current.some((m) => String(m.id) === String(medicine.id))) return
    const snapshot = {
      id: medicine.id,
      name_hy: medicine.name_hy,
      name_ru: medicine.name_ru,
      name_en: medicine.name_en,
      active_substance: medicine.active_substance,
      category: medicine.category,
      form: medicine.form,
      dosage: medicine.dosage,
      manufacturer: medicine.manufacturer,
    }
    writeStorage([snapshot, ...current])
  }, [])

  const remove = useCallback((id) => {
    const current = readStorage()
    writeStorage(current.filter((m) => String(m.id) !== String(id)))
  }, [])

  const toggle = useCallback(
    (medicine) => {
      if (!medicine || medicine.id == null) return
      const current = readStorage()
      const exists = current.some((m) => String(m.id) === String(medicine.id))
      if (exists) remove(medicine.id)
      else add(medicine)
    },
    [add, remove]
  )

  const clear = useCallback(() => writeStorage([]), [])

  return { items, count: items.length, isFavorite, add, remove, toggle, clear }
}
