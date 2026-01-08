
import React, { useState, useEffect, useMemo } from 'react';
import { TEAM_MAP, PRODUCT_MAP } from './constants';
import { Theme, FileFormat } from './types';

// Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

// Gear Category Icons
const JerseyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
);

const ShirtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l3 6-4 1v11H7V10l-4-1z"/></svg>
);

const PantsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l1 9-3 10H8L5 12z"/><path d="M12 3v19"/></svg>
);

const JacketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h2V7a5 5 0 0 1 5-5z"/><path d="M12 9v12"/></svg>
);

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/></svg>
);

const GenericApparelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
);

const getGearIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('jersey') || n.includes('pinnie') || n.includes('uniform')) return <JerseyIcon />;
  if (n.includes('pants') || n.includes('shorts') || n.includes('skort') || n.includes('leggings') || n.includes('joggers') || n.includes('panties')) return <PantsIcon />;
  if (n.includes('hoodie') || n.includes('jacket') || n.includes('windbreaker') || n.includes('zip') || n.includes('sweatshirt')) return <JacketIcon />;
  if (n.includes('shirt') || n.includes('polo') || n.includes('singlet') || n.includes('tank top') || n.includes('sleeve') || n.includes('guard')) return <ShirtIcon />;
  if (n.includes('bag') || n.includes('duffle')) return <BagIcon />;
  return <GenericApparelIcon />;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [collectionId, setCollectionId] = useState('');
  const [teamType, setTeamType] = useState<string>('');
  const [customList, setCustomList] = useState('');
  const [extraGears, setExtraGears] = useState<string[]>([]);
  const [format, setFormat] = useState<FileFormat>('.png');
  const [version, setVersion] = useState('');
  const [copied, setCopied] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isAddingGear, setIsAddingGear] = useState(false);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
      document.body.classList.remove('bg-white', 'text-slate-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-white', 'text-slate-900');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
    }
  }, [theme]);

  // When team type changes, clear extra gears to avoid confusion
  useEffect(() => {
    setExtraGears([]);
  }, [teamType]);

  // Derive Current Gear List
  const currentGearList = useMemo(() => {
    let baseList: string[] = [];
    if (teamType === 'custom') {
      baseList = customList.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    } else if (teamType && TEAM_MAP[teamType]) {
      baseList = [...TEAM_MAP[teamType]];
    }
    
    // Combine base team list with extra manually added gears, ensuring uniqueness
    const combined = Array.from(new Set([...baseList, ...extraGears]));
    return combined;
  }, [teamType, customList, extraGears]);

  // Command Generation Logic
  const generatedOutput = useMemo(() => {
    let currentWarnings: string[] = [];

    const commands = currentGearList.map(gearName => {
      const productId = PRODUCT_MAP[gearName];
      if (!productId) {
        currentWarnings.push(`Gear name "${gearName}" not found in Product ID database.`);
        return null;
      }
      return `ren "${gearName}${format}" "${collectionId}+${productId}+${version}${format}"`;
    }).filter(cmd => cmd !== null);

    setWarnings(currentWarnings);
    return commands.join('\n');
  }, [collectionId, currentGearList, format, version]);

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddExtraGear = (gearName: string) => {
    if (gearName && !extraGears.includes(gearName)) {
      setExtraGears(prev => [...prev, gearName]);
    }
    setIsAddingGear(false);
  };

  const handleRemoveGear = (gearName: string) => {
    if (extraGears.includes(gearName)) {
      setExtraGears(prev => prev.filter(g => g !== gearName));
    } else if (teamType === 'custom') {
        const newList = customList.split('\n')
            .map(line => line.trim())
            .filter(line => line !== gearName)
            .join('\n');
        setCustomList(newList);
    }
  };

  const inputBaseClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400";

  const allAvailableGears = Object.keys(PRODUCT_MAP).sort();

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 md:p-8 flex flex-col items-center ${theme === Theme.DARK ? 'dark text-white' : 'text-slate-900'}`}>
      
      {/* Header */}
      <header className="w-full max-w-7xl flex justify-between items-start mb-12">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center">
          <img 
            src="https://teamtime.shop/cdn/shop/files/Team_Time_Logo_2.png?v=1699977602&width=240" 
            alt="Team Time Logo" 
            className="h-16 md:h-20 object-contain dark:invert transition-all duration-300"
          />
        </div>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <main className="w-full max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none">Batch File Renamer</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium max-w-lg mx-auto text-sm md:text-base">Professional production utility for Team Time Apparel. High-precision naming system.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Panel: Gears Included */}
          <aside className="w-full lg:w-80 shrink-0 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 self-stretch flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Gears Included</h2>
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                {currentGearList.length}
              </span>
            </div>
            
            <div className="space-y-3 custom-scrollbar overflow-y-auto max-h-[400px] lg:max-h-[600px] pr-2 flex-1">
              {currentGearList.length > 0 ? (
                currentGearList.map((gear, idx) => {
                  const isRemovable = extraGears.includes(gear) || teamType === 'custom';
                  return (
                    <div key={idx} className="group flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="text-slate-300 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0">
                          {getGearIcon(gear)}
                        </div>
                        <span className="text-sm font-semibold truncate text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                          {gear}
                        </span>
                      </div>
                      {isRemovable && (
                        <button 
                          onClick={() => handleRemoveGear(gear)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                          title="Remove gear"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center space-y-3 opacity-30">
                  <div className="flex justify-center"><GenericApparelIcon /></div>
                  <p className="text-xs font-bold uppercase tracking-widest">No gear selected</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              {isAddingGear ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                   <select 
                    autoFocus
                    onChange={(e) => handleAddExtraGear(e.target.value)}
                    onBlur={() => !isAddingGear && setIsAddingGear(false)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select gear to add...</option>
                    {allAvailableGears.map(gear => (
                      <option key={gear} value={gear}>{gear}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setIsAddingGear(false)}
                    className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAddingGear(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
                >
                  <PlusIcon />
                  <span>Add Gear</span>
                </button>
              )}
            </div>
          </aside>

          {/* Right Panel: Inputs and Output */}
          <div className="flex-1 space-y-8 w-full">
            
            {/* Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
              
              {/* Collection ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block ml-1">Collection ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. 47471987..."
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                  className={inputBaseClass}
                />
              </div>

              {/* Version */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block ml-1">Version</label>
                <input 
                  type="text" 
                  placeholder="e.g. 13"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className={inputBaseClass}
                />
              </div>

              {/* Team Type Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block ml-1">Team Type</label>
                <select 
                  value={teamType}
                  onChange={(e) => setTeamType(e.target.value)}
                  className={`${inputBaseClass} cursor-pointer appearance-none`}
                >
                  <option value="" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">Select a Team Type...</option>
                  {Object.keys(TEAM_MAP).sort().map(team => (
                    <option key={team} value={team} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">{team}</option>
                  ))}
                  <option value="custom" className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800">--- CREATE CUSTOM LIST ---</option>
                </select>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block ml-1">Format</label>
                <select 
                  value={format}
                  onChange={(e) => setFormat(e.target.value as FileFormat)}
                  className={`${inputBaseClass} cursor-pointer appearance-none`}
                >
                  <option value=".png" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">.png</option>
                  <option value=".jpg" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">.jpg</option>
                  <option value=".webp" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">.webp</option>
                </select>
              </div>

              {/* Custom List Textarea */}
              {teamType === 'custom' && (
                <div className="md:col-span-2 space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block ml-1">Enter Gear Names (One per line)</label>
                  <textarea 
                    rows={5}
                    placeholder="Full Button Baseball Jersey&#10;Hoodie&#10;Duffle Bag"
                    value={customList}
                    onChange={(e) => setCustomList(e.target.value)}
                    className={`${inputBaseClass} font-mono text-sm custom-scrollbar h-auto min-h-[120px]`}
                  />
                </div>
              )}
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-3">
                <span className="text-amber-600 dark:text-amber-500 font-bold mt-0.5">⚠</span>
                <div className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  {warnings.map((w, i) => <p key={i}>{w}</p>)}
                </div>
              </div>
            )}

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Generated Rename Commands</h2>
                <button 
                  onClick={handleCopy}
                  disabled={!generatedOutput}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    copied 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                      : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/10 dark:shadow-none'
                  }`}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              
              <div className="relative group">
                <textarea 
                  readOnly
                  value={generatedOutput || 'Generated commands will appear here...'}
                  className="w-full h-72 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-sm leading-relaxed custom-scrollbar focus:outline-none focus:ring-1 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all shadow-inner text-slate-900 dark:text-slate-100"
                />
                {!generatedOutput && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 grayscale">
                     <p className="font-black text-4xl uppercase tracking-tighter text-slate-400 rotate-[-5deg]">Ready for Input</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 pb-12 text-center space-y-4">
        <div className="flex justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-700">
          <span>Performance</span>
          <span>•</span>
          <span>Minimalism</span>
          <span>•</span>
          <span>Precision</span>
        </div>
        <p className="text-slate-400 dark:text-slate-600 text-xs font-medium uppercase tracking-[0.1em]">
          &copy; {new Date().getFullYear()} Team Time Apparel. Professional Production Utility.
        </p>
      </footer>
    </div>
  );
};

export default App;
