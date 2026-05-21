import { useEffect, useState } from 'react'
import {
  adminListMedicines, adminCreateMedicine, adminUpdateMedicine, adminDeleteMedicine,
  adminListCategories, adminCreateCategory, adminDeleteCategory,
  adminListAliases, adminCreateAlias, adminDeleteAlias,
  adminListUnknown, adminDeleteUnknown, adminImportFile,
} from '../api'

function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
        active
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`}
    >{children}</button>
  )
}

const blank = {
  name_hy: '', name_ru: '', name_en: '',
  active_substance: '', form: '', dosage: '',
  manufacturer: '', country: '', category: 'other', image_url: '',
  description: { hy: '', ru: '', en: '' },
  indications: { hy: '', ru: '', en: '' },
  instruction: { hy: '', ru: '', en: '' },
  side_effects: [], contraindications: [], variants: [], aliases: [],
}

function MedicinesTab() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState(blank)

  const load = () => adminListMedicines({ limit: 200 }).then(setItems)
  useEffect(() => { load() }, [])

  const startNew = () => { setEditing('new'); setDraft(blank) }
  const startEdit = (m) => {
    setEditing(m.id)
    setDraft({
      ...blank, ...m,
      description: m.description || blank.description,
      indications: m.indications || blank.indications,
      instruction: m.instruction || blank.instruction,
      side_effects: m.side_effects || [],
      contraindications: m.contraindications || [],
      aliases: m.aliases || [],
    })
  }
  const save = async () => {
    if (editing === 'new') await adminCreateMedicine(draft)
    else await adminUpdateMedicine(editing, draft)
    setEditing(null); load()
  }
  const remove = async (id) => {
    if (!confirm('Delete medicine?')) return
    await adminDeleteMedicine(id); load()
  }

  const I18nInput = ({ label, field }) => (
    <div className="grid grid-cols-3 gap-2">
      {['hy', 'ru', 'en'].map(l => (
        <label key={l} className="text-xs">
          <span className="text-slate-500">{label} ({l.toUpperCase()})</span>
          <textarea
            rows={2}
            value={draft[field]?.[l] || ''}
            onChange={(e) => setDraft({ ...draft, [field]: { ...draft[field], [l]: e.target.value } })}
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </label>
      ))}
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Medicines ({items.length})</h2>
        <button onClick={startNew} className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">+ New</button>
      </div>

      {editing !== null && (
        <div className="border rounded-xl p-4 mb-4 bg-slate-50 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {['name_hy', 'name_ru', 'name_en'].map(f => (
              <input key={f} placeholder={f}
                value={draft[f]} onChange={(e) => setDraft({ ...draft, [f]: e.target.value })}
                className="border rounded px-2 py-1 text-sm" />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['active_substance', 'form', 'dosage', 'manufacturer'].map(f => (
              <input key={f} placeholder={f}
                value={draft[f]} onChange={(e) => setDraft({ ...draft, [f]: e.target.value })}
                className="border rounded px-2 py-1 text-sm" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input placeholder="country" value={draft.country}
              onChange={(e) => setDraft({ ...draft, country: e.target.value })}
              className="border rounded px-2 py-1 text-sm" />
            <input placeholder="category" value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="border rounded px-2 py-1 text-sm" />
            <input placeholder="image_url" value={draft.image_url}
              onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
              className="border rounded px-2 py-1 text-sm" />
          </div>
          <I18nInput label="Description" field="description" />
          <I18nInput label="Indications" field="indications" />
          <I18nInput label="Instruction" field="instruction" />
          <textarea placeholder="aliases (comma-separated)"
            value={(draft.aliases || []).join(', ')}
            onChange={(e) => setDraft({ ...draft, aliases: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            className="w-full border rounded px-2 py-1 text-sm" rows={2} />
          <div className="flex gap-2">
            <button onClick={save} className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="px-3 py-1.5 border rounded text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr><th className="p-2">#</th><th className="p-2">Name</th>
            <th className="p-2">Substance</th><th className="p-2">Category</th>
            <th className="p-2"></th></tr>
          </thead>
          <tbody>
            {items.map(m => (
              <tr key={m.id} className="border-t">
                <td className="p-2 text-slate-400">{m.id}</td>
                <td className="p-2">{m.name_en || m.name_hy}</td>
                <td className="p-2 text-slate-500">{m.active_substance}</td>
                <td className="p-2"><span className="text-xs bg-slate-100 px-2 py-0.5 rounded">{m.category}</span></td>
                <td className="p-2 text-right">
                  <button onClick={() => startEdit(m)} className="text-indigo-700 hover:underline mr-3">edit</button>
                  <button onClick={() => remove(m.id)} className="text-red-600 hover:underline">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CategoriesTab() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ key: '', name_hy: '', name_ru: '', name_en: '' })
  const load = () => adminListCategories().then(setItems)
  useEffect(() => { load() }, [])
  const add = async () => { if (!form.key) return; await adminCreateCategory(form); setForm({ key: '', name_hy: '', name_ru: '', name_en: '' }); load() }
  return (
    <div>
      <h2 className="font-semibold mb-3">Categories ({items.length})</h2>
      <div className="grid grid-cols-5 gap-2 mb-3">
        {['key', 'name_hy', 'name_ru', 'name_en'].map(f => (
          <input key={f} placeholder={f} value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            className="border rounded px-2 py-1 text-sm" />
        ))}
        <button onClick={add} className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">Add</button>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr><th className="p-2">Key</th><th className="p-2">HY</th><th className="p-2">RU</th><th className="p-2">EN</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id} className="border-t">
                <td className="p-2 font-mono text-xs">{c.key}</td>
                <td className="p-2">{c.name_hy}</td>
                <td className="p-2">{c.name_ru}</td>
                <td className="p-2">{c.name_en}</td>
                <td className="p-2 text-right">
                  <button onClick={async () => { await adminDeleteCategory(c.id); load() }}
                    className="text-red-600 hover:underline">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AliasesTab() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ alias: '', medicine_id: '', active_substance: '' })
  const load = () => adminListAliases().then(setItems)
  useEffect(() => { load() }, [])
  const add = async () => {
    if (!form.alias || !form.medicine_id) return
    await adminCreateAlias({ ...form, medicine_id: Number(form.medicine_id) })
    setForm({ alias: '', medicine_id: '', active_substance: '' }); load()
  }
  return (
    <div>
      <h2 className="font-semibold mb-3">Aliases ({items.length})</h2>
      <div className="grid grid-cols-4 gap-2 mb-3">
        <input placeholder="alias" value={form.alias}
          onChange={(e) => setForm({ ...form, alias: e.target.value })}
          className="border rounded px-2 py-1 text-sm" />
        <input placeholder="medicine_id" value={form.medicine_id}
          onChange={(e) => setForm({ ...form, medicine_id: e.target.value })}
          className="border rounded px-2 py-1 text-sm" />
        <input placeholder="active_substance (opt)" value={form.active_substance}
          onChange={(e) => setForm({ ...form, active_substance: e.target.value })}
          className="border rounded px-2 py-1 text-sm" />
        <button onClick={add} className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">Add</button>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr><th className="p-2">Alias</th><th className="p-2">Med ID</th><th className="p-2">Substance</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.alias}</td>
                <td className="p-2 text-slate-400">{a.medicine_id}</td>
                <td className="p-2 text-slate-500">{a.active_substance}</td>
                <td className="p-2 text-right">
                  <button onClick={async () => { await adminDeleteAlias(a.id); load() }}
                    className="text-red-600 hover:underline">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UnknownTab() {
  const [items, setItems] = useState([])
  const load = () => adminListUnknown().then(setItems)
  useEffect(() => { load() }, [])
  return (
    <div>
      <h2 className="font-semibold mb-3">Unknown searches ({items.length})</h2>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr><th className="p-2">Query</th><th className="p-2">Lang</th><th className="p-2">Count</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-2 font-medium">{s.query}</td>
                <td className="p-2 text-slate-500">{s.language}</td>
                <td className="p-2">{s.count}</td>
                <td className="p-2 text-right">
                  <button onClick={async () => { await adminDeleteUnknown(s.id); load() }}
                    className="text-red-600 hover:underline">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ImportTab() {
  const [file, setFile] = useState(null)
  const [report, setReport] = useState(null)
  const [busy, setBusy] = useState(false)
  const run = async () => {
    if (!file) return
    setBusy(true)
    try { setReport(await adminImportFile(file)) }
    catch (e) { setReport({ error: e.message }) }
    finally { setBusy(false) }
  }
  return (
    <div className="space-y-3">
      <h2 className="font-semibold">Import dataset (JSON / CSV / XLSX)</h2>
      <input type="file" accept=".json,.csv,.xlsx" onChange={(e) => setFile(e.target.files?.[0])} />
      <button onClick={run} disabled={!file || busy}
        className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm disabled:opacity-50">
        {busy ? 'Importing…' : 'Import'}
      </button>
      {report && (
        <pre className="bg-slate-50 border rounded p-3 text-xs overflow-auto">
{JSON.stringify(report, null, 2)}
        </pre>
      )}
      <p className="text-xs text-slate-500">
        JSON: array of records. CSV/XLSX: first row = headers. Recognized fields:
        name_hy, name_ru, name_en, active_substance, form, dosage, manufacturer,
        country, category, image_url, description, indications, side_effects,
        contraindications, instruction, variants, aliases.
      </p>
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('medicines')
  return (
    <div className="container-app py-10">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">PharmAI Admin</h1>
          <p className="text-sm text-slate-500 mt-1">Content & data management</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white border border-slate-200/80 shadow-sm">
          <Tab active={tab === 'medicines'} onClick={() => setTab('medicines')}>Medicines</Tab>
          <Tab active={tab === 'categories'} onClick={() => setTab('categories')}>Categories</Tab>
          <Tab active={tab === 'aliases'} onClick={() => setTab('aliases')}>Aliases</Tab>
          <Tab active={tab === 'unknown'} onClick={() => setTab('unknown')}>Unknown</Tab>
          <Tab active={tab === 'import'} onClick={() => setTab('import')}>Import</Tab>
        </div>
      </div>
      <div className="card p-6">
        {tab === 'medicines' && <MedicinesTab />}
        {tab === 'categories' && <CategoriesTab />}
        {tab === 'aliases' && <AliasesTab />}
        {tab === 'unknown' && <UnknownTab />}
        {tab === 'import' && <ImportTab />}
      </div>
    </div>
  )
}
