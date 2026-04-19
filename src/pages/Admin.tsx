import React, { useState, useEffect } from 'react';
import { Copy, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { kandams as initialKandams, pravachanaRoopaRamayanam as initialPravachanam, Kandam, Sarga, Pravachanam } from '../data/content';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'kandams' | 'pravachanam'>('kandams');
  const [copied, setCopied] = useState(false);

  // Local state holding the full data
  const [kandams, setKandams] = useState<Kandam[]>(initialKandams);
  const [pravachanam, setPravachanam] = useState<Pravachanam[]>(initialPravachanam);

  // Editor states
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState<'create' | 'update'>('create');
  
  // Form fields
  const [targetKandamId, setTargetKandamId] = useState('bala');
  const [itemId, setItemId] = useState('');
  const [itemNumber, setItemNumber] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemShloka, setItemShloka] = useState('');
  const [itemContent, setItemContent] = useState('');

  // Handle Opening Editor
  const openEditor = (type: 'sarga' | 'pravachanam', mode: 'create' | 'update', item?: Sarga | Pravachanam, kId?: string) => {
    setEditMode(mode);
    setIsEditing(true);
    
    if (mode === 'update' && item) {
      setItemId(item.id);
      setItemNumber(item.number.toString());
      setItemTitle(item.title);
      setItemContent(item.content.join('\n\n'));
      
      if (type === 'sarga' && kId) {
        setTargetKandamId(kId);
      } else if (type === 'pravachanam') {
        setItemShloka((item as Pravachanam).shloka || '');
      }
    } else {
      setItemId('');
      setItemNumber('');
      setItemTitle('');
      setItemShloka('');
      setItemContent('');
    }
  };

  const closeEditor = () => {
    setIsEditing(false);
  };

  const saveItem = () => {
    const contentArray = itemContent.split('\n').filter(p => p.trim() !== '').map(p => p.trim());
    
    if (activeTab === 'kandams') {
      const parsedNumber = parseInt(itemNumber) || 0;
      const finalId = editMode === 'create' ? `${targetKandamId}-${parsedNumber}` : itemId;
      const newItem: Sarga = {
        id: finalId,
        number: parsedNumber,
        title: itemTitle,
        content: contentArray
      };

      setKandams(prev => prev.map(k => {
        if (k.id === targetKandamId) {
          let newSargas = [...k.sargas];
          if (editMode === 'create') {
            newSargas.push(newItem);
          } else {
            newSargas = newSargas.map(s => s.id === itemId ? newItem : s);
          }
          // Sort by number
          newSargas.sort((a, b) => a.number - b.number);
          return { ...k, sargas: newSargas };
        }
        return k;
      }));
    } else {
      let finalNumber: string | number = itemNumber;
      if (!isNaN(Number(itemNumber)) && itemNumber.trim() !== '') {
        finalNumber = Number(itemNumber);
      }
      
      const sanitizedNumberStr = String(finalNumber).replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
      const finalId = editMode === 'create' ? `pravachanam-${sanitizedNumberStr}` : itemId;
      const newItem: Pravachanam = {
        id: finalId,
        number: finalNumber,
        title: itemTitle,
        shloka: itemShloka.trim() || undefined,
        content: contentArray
      };

      setPravachanam(prev => {
        let newList = [...prev];
        if (editMode === 'create') {
          newList.push(newItem);
        } else {
          newList = newList.map(p => p.id === itemId ? newItem : p);
        }
        
        const getSortVal = (val: string | number) => {
          if (typeof val === 'number') return val;
          const match = String(val).match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        };

        newList.sort((a, b) => getSortVal(a.number) - getSortVal(b.number));
        return newList;
      });
    }
    closeEditor();
  };

  const deleteSarga = (kandamId: string, sargaId: string) => {
    if (confirm('Are you sure you want to delete this chapter?')) {
      setKandams(prev => prev.map(k => {
        if (k.id === kandamId) {
          return { ...k, sargas: k.sargas.filter(s => s.id !== sargaId) };
        }
        return k;
      }));
    }
  };

  const deletePravachanam = (id: string) => {
    if (confirm('Are you sure you want to delete this specific part?')) {
      setPravachanam(prev => prev.filter(p => p.id !== id));
    }
  };

  const generateFullFileCode = () => {
    return `export type Sarga = {
  id: string;
  number: number;
  title: string;
  content: string[];
};

export type Kandam = {
  id: string;
  name: string;
  description: string;
  sargas: Sarga[];
};

export type Pravachanam = {
  id: string;
  number: number | string;
  title: string;
  shloka?: string;
  content: string[];
};

export const kandams: Kandam[] = ${JSON.stringify(kandams, null, 2)};

export const pravachanaRoopaRamayanam: Pravachanam[] = ${JSON.stringify(pravachanam, null, 2)};
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFullFileCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
      <Breadcrumbs items={[{ label: 'Admin Console' }]} />

      <div>
        <h1 className="text-3xl font-serif font-bold mb-4" style={{ color: 'var(--text-color)' }}>
          Admin Content Center
        </h1>
        <p className="max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Manage your chapters below. When you are done making changes, click <strong>Copy Full Data File</strong> 
          and paste the entirely new code into <span className="font-mono bg-black/5 px-2 py-0.5 rounded text-sm">/src/data/content.ts</span> to permanently save it.
        </p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row items-start">
        {/* Editor Side */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex rounded-lg overflow-hidden border p-1" style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)' }}>
            <button 
              onClick={() => { setActiveTab('kandams'); closeEditor(); }} 
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'kandams' ? 'bg-[var(--card-bg)] shadow text-[var(--accent-color)] border border-[var(--border-color)]' : 'hover:bg-white/50 opacity-60'}`}
            >
              Kandam Chapters
            </button>
            <button 
              onClick={() => { setActiveTab('pravachanam'); closeEditor(); }} 
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'pravachanam' ? 'bg-[var(--card-bg)] shadow text-[var(--accent-color)] border border-[var(--border-color)]' : 'hover:bg-white/50 opacity-60'}`}
            >
              Pravachanam Parts
            </button>
          </div>

          {!isEditing ? (
            <div className="space-y-6">
              <button 
                onClick={() => openEditor(activeTab === 'kandams' ? 'sarga' : 'pravachanam', 'create')}
                className="flex w-full items-center justify-center gap-2 border-2 border-dashed p-4 rounded-xl font-bold hover:bg-[var(--sidebar-bg)] transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--accent-color)' }}
              >
                <Plus size={20} /> Add New {activeTab === 'kandams' ? 'Sarga (Chapter)' : 'Pravachanam Part'}
              </button>

              {activeTab === 'kandams' && (
                <div className="space-y-6">
                  {kandams.map(kandam => (
                    <div key={kandam.id} className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                      <div className="p-4 font-bold border-b" style={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}>
                        {kandam.name} <span className="opacity-50 text-sm font-normal">({kandam.sargas.length} Chapters)</span>
                      </div>
                      <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                        {kandam.sargas.map(sarga => (
                          <div key={sarga.id} className="p-4 flex items-center justify-between hover:bg-black/5 transition-colors">
                            <div>
                              <div className="text-sm font-semibold opacity-60">Sarga {sarga.number}</div>
                              <div className="font-tamil" style={{ color: 'var(--text-color)' }}>{sarga.title}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => openEditor('sarga', 'update', sarga, kandam.id)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => deleteSarga(kandam.id, sarga.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center justify-center">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {kandam.sargas.length === 0 && (
                          <div className="p-4 text-center opacity-50 text-sm">No chapters yet.</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'pravachanam' && (
                <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                  <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                    {pravachanam.map(item => (
                      <div key={item.id} className="p-4 flex items-center justify-between hover:bg-black/5 transition-colors">
                        <div>
                          <div className="text-sm font-semibold opacity-60">Part {item.number}</div>
                          <div className="font-tamil" style={{ color: 'var(--text-color)' }}>{item.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditor('pravachanam', 'update', item)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center justify-center">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deletePravachanam(item.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center justify-center">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {pravachanam.length === 0 && (
                      <div className="p-4 text-center opacity-50 text-sm">No parts yet.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between font-bold text-lg mb-4" style={{ color: 'var(--text-color)' }}>
                {editMode === 'create' ? 'Add New' : 'Edit'} Content
              </div>

              {activeTab === 'kandams' && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Target Kandam</label>
                  <select 
                    value={targetKandamId}
                    onChange={e => setTargetKandamId(e.target.value)}
                    className="w-full border border-[var(--border-color)] bg-transparent p-3 rounded-xl focus:outline-none focus:border-[var(--accent-color)]"
                    disabled={editMode === 'update'}
                  >
                    {kandams.map(k => (
                      <option key={k.id} value={k.id}>{k.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                    {activeTab === 'kandams' ? 'Sarga Number (e.g., 15)' : 'Part Number or Range (e.g., 15 or 67-71)'}
                  </label>
                  <input 
                    type={activeTab === 'kandams' ? 'number' : 'text'} 
                    value={itemNumber}
                    onChange={e => setItemNumber(e.target.value)}
                    className="w-full border border-[var(--border-color)] bg-transparent p-3 rounded-xl focus:outline-none focus:border-[var(--accent-color)]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Tamil Title</label>
                <input 
                  type="text" 
                  value={itemTitle}
                  onChange={e => setItemTitle(e.target.value)}
                  className="w-full border border-[var(--border-color)] bg-transparent p-3 rounded-xl font-tamil focus:outline-none focus:border-[var(--accent-color)]" 
                />
              </div>

              {activeTab === 'pravachanam' && (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Sanskrit Shloka (Optional)</label>
                  <textarea 
                    value={itemShloka}
                    onChange={e => setItemShloka(e.target.value)}
                    className="w-full border border-[var(--border-color)] bg-transparent p-3 rounded-xl focus:outline-none focus:border-[var(--accent-color)]" 
                    rows={2}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-color)' }}>Text Content (Each line becomes a paragraph)</label>
                <textarea 
                  value={itemContent}
                  onChange={e => setItemContent(e.target.value)}
                  className="w-full border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 font-tamil rounded-xl focus:outline-none focus:border-[var(--accent-color)]" 
                  rows={8}
                />
              </div>

              <div className="flex gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <button onClick={saveItem} className="flex-1 bg-[var(--accent-color)] text-white py-3 rounded-xl font-bold hover:opacity-90">
                  Save Changes
                </button>
                <button onClick={closeEditor} className="px-6 py-3 border border-[var(--border-color)] rounded-xl font-bold hover:bg-black/5" style={{ color: 'var(--text-color)' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Output Side */}
        <div className="w-full lg:w-[350px] shrink-0 sticky top-[100px]">
          <div className="bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[var(--border-color)] space-y-4">
              <div className="font-bold text-lg" style={{ color: 'var(--text-color)' }}>Commit Changes</div>
              <p className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--text-color)' }}>
                Because this site generates its content statistically for BSNL performance, your changes are stored in memory right now. 
                <br/><br/>
                Click the button below to copy the complete, updated <span className="font-mono bg-black/10 px-1 rounded">content.ts</span> file code.
              </p>
              <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 bg-[var(--accent-color)] text-white p-4 rounded-xl hover:opacity-90 transition-opacity font-bold"
              >
                {copied ? <><CheckCircle2 size={20} /> Successfully Copied!</> : <><Copy size={20} /> Copy Full Data File</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
