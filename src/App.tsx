import React, { useState, useEffect } from 'react';
import { ChefHat, Camera, ScrollText, HeartPulse, Search, Info, Menu, X, XCircle, Heart, Sun, Moon, Hammer, Library, Sword, Pickaxe, Map, Apple, UserCircle, LogOut, LogIn, PlusCircle, MinusCircle, Zap, Shield, ChevronUp, ChevronDown, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { analyzeFoodImage, generateRecipeFromIngredients, getIngredientPrices, getHealthInsights, getCheckupStatus, getVariationRecipe, getVitalsStatus, getVitalsRecommendation } from './services/geminiService';
import { DISHES, Dish } from './data/dishes';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, syncUserProfile, db, updateUserVitals } from './lib/firebase';
import { doc, getDoc, collection, getDocs, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

import { Chatbot } from './components/Chatbot';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'generator'>('dashboard');
  const [synthesisHistory, setSynthesisHistory] = useState<{dishName: string, message: string, timestamp: number}[]>([]);
  const [isCheckupModalOpen, setIsCheckupModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isMarketplaceModalOpen, setIsMarketplaceModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [vitals, setVitals] = useState({ health: 100, shield: 100, energy: 100 });
  const [maxVitals, setMaxVitals] = useState({ health: 100, shield: 100, energy: 100 });
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMarketplaceMenuOpen, setIsMarketplaceMenuOpen] = useState(false);
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [aiCheckupStatus, setAiCheckupStatus] = useState<string>("NORMAL CONDITION");
  const [isGeneratingAiStatus, setIsGeneratingAiStatus] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [depletionWarning, setDepletionWarning] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isFetchingRecommendation, setIsFetchingRecommendation] = useState(false);
  
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const CONDITIONS = ["Diabetes", "High Blood Pressure", "Cholesterol", "Allergies", "Heart Disease"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await syncUserProfile(u);
          const userRef = doc(db, 'users', u.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            if (data.vitals) {
              setVitals(data.vitals);
            }
          }
        } catch (error) {
          console.error("Error syncing profile:", error);
        }
      } else {
        setVitals({ health: 100, shield: 100, energy: 100 });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const updateVitalsStatus = async () => {
      // Don't override if user is actively generating checkup
      if (vitals.health >= maxVitals.health && vitals.energy >= maxVitals.energy && vitals.shield >= maxVitals.shield) {
        setAiCheckupStatus("NORMAL CONDITION");
      } else {
        setIsGeneratingAiStatus(true);
        const statusMsg = await getVitalsStatus(vitals);
        if (isMounted) {
          setAiCheckupStatus(statusMsg);
          setIsGeneratingAiStatus(false);
        }
      }

      if ((vitals.health <= 20 || vitals.energy <= 20 || vitals.shield <= 0) && (vitals.health > 0 || vitals.shield > 0 || vitals.energy > 0)) {
        setIsWarningModalOpen(true);
        if(vitals.health <= 20) setDepletionWarning("CRITICAL HP. LIFE SUPPORT FAILING.");
        else if(vitals.shield <= 0) setDepletionWarning("SHIELD DEPLETED. VULNERABLE TO TOXICITY.");
        else if(vitals.energy <= 20) setDepletionWarning("LOW ENERGY. MOVEMENT RESTRICTED.");
        
        setIsFetchingRecommendation(true);
        const rec = await getVitalsRecommendation(vitals);
        if (isMounted) {
          setAiRecommendation(rec);
          setIsFetchingRecommendation(false);
        }
      }
    };
    updateVitalsStatus();
    return () => { isMounted = false; };
  }, [vitals.health, vitals.energy, vitals.shield, maxVitals.health, maxVitals.energy, maxVitals.shield]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfile(result.user);
      }
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user') {
        console.error("Login failed:", error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAccountMenuOpen(false);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  
  // Filtering state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<'Traditional' | 'Modern' | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Food' | 'Beverage' | null>(null);

  // Modal State
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const countries = Array.from(new Set(DISHES.map(d => d.country)));

  let statusIconColor = 'text-game-green';
  let statusTextColor = 'text-game-green/80';
  if (aiCheckupStatus === 'MILD CONDITION') {
    statusIconColor = 'text-yellow-400';
    statusTextColor = 'text-yellow-400 font-bold uppercase';
  } else if (aiCheckupStatus === 'RISK CONDITION') {
    statusIconColor = 'text-orange-500 animate-pulse';
    statusTextColor = 'text-orange-500 font-bold uppercase';
  } else if (aiCheckupStatus === 'SEVERE') {
    statusIconColor = 'text-red-500 animate-pulse';
    statusTextColor = 'text-red-500 font-black uppercase tracking-widest';
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-app-bg text-app-text-main relative transition-colors duration-300">
      {/* Top Navigation */}
      <header className="bg-app-surface border-b-4 border-app-border py-2 px-3 md:py-6 md:px-8 flex flex-col gap-2 md:gap-6 sticky top-0 z-30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between flex-wrap gap-2 md:gap-4 w-full">
          <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-app-border transition-colors text-game-accent"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden md:flex p-2 rounded-md hover:bg-app-border transition-colors text-app-text-muted"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-game-green/20 border-2 border-app-border flex items-center justify-center rounded-none shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              <span className="text-3xl md:text-4xl">🌽</span>
            </div>
            <div>
              <div className="text-lg md:text-xl font-black tracking-[0.2em] text-app-text-main uppercase leading-none">
                CORN
              </div>
              <div className="text-xs md:text-base font-mono text-game-green flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-game-green animate-pulse"></span>
                WORLD: KITCHEN
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-2 border-app-border order-last lg:order-none w-full lg:w-auto bg-app-bg/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          {/* VITALS SECTION */}
          <div className="flex items-center gap-3 md:gap-4 px-4 py-2 justify-center flex-wrap sm:flex-nowrap border-b border-app-border min-w-min">
            <VitalBar icon={<Heart className="text-game-magenta" size={14} fill="currentColor" />} label="HP" value={vitals.health} max={maxVitals.health} color="bg-game-magenta" tooltip="Overall physical wellness." />
            <VitalBar icon={<Zap className="text-game-accent" size={14} fill="currentColor" />} label="NRG" value={vitals.energy || 100} max={maxVitals.energy} color="bg-game-accent" tooltip="Current energy levels. Consuming items affects your energy." />
            <VitalBar icon={<Shield className="text-game-green" size={14} fill="currentColor" />} label="SHD" value={vitals.shield} max={maxVitals.shield} color="bg-game-green" tooltip="Defense against nutritional risks." />
          </div>
          
          {/* INFO TICKER SECTION */}
          <div className="flex items-center gap-2 px-3 py-1 text-[10px] md:text-xs overflow-hidden bg-black/40 relative h-6">
            <div className="flex items-center gap-1 font-black tracking-widest text-app-text-muted shrink-0 pr-2 border-r border-app-border/50 uppercase">
              <ScrollText size={12} className={statusIconColor} />
              <span>Status</span>
            </div>
            <div className="flex-1 whitespace-nowrap overflow-hidden relative flex items-center pr-2">
                {isGeneratingAiStatus ? (
                  <span className="font-mono text-game-accent animate-pulse uppercase tracking-widest">TRANSMITTING TELEMETRY...</span>
                ) : (
                  <div className={`font-mono uppercase tracking-widest truncate w-full ${statusTextColor}`}>
                    {aiCheckupStatus === 'NORMAL CONDITION' ? 'All vitals operating within optimal parameters.' : `WARNING: ${aiCheckupStatus}`}
                  </div>
                )}
            </div>
          </div>
        </div>

          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-none border border-app-border bg-app-surface hover:border-game-accent text-app-text-muted hover:text-game-accent transition-all shadow-sm"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User Account Section */}
            <div className="relative">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:p-2 border-2 border-app-border bg-app-bg hover:border-game-accent transition-all group"
                >
                  <img 
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=00f2ff&color=0a0a0c`} 
                    alt="Profile" 
                    className="w-8 h-8 object-cover border border-app-border group-hover:border-game-accent"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden md:block text-xs font-bold uppercase tracking-widest px-2">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-app-surface border-4 border-app-border shadow-[8px_8px_0_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b-2 border-app-border">
                      <div className="text-[10px] font-mono text-game-accent uppercase tracking-[0.2em] mb-1">User Identity</div>
                      <div className="text-sm font-black text-app-text-main truncate">{user.displayName}</div>
                      <div className="text-[10px] text-app-text-muted truncate mt-1">{user.email}</div>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-game-magenta hover:bg-game-magenta/10 transition-colors"
                      >
                        <LogOut size={16} /> Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="game-btn game-btn-outline py-2 px-4 flex items-center gap-2 text-xs"
              >
                <LogIn size={16} /> Link account
              </button>
            )}
          </div>
        </div>
        </div>

        {/* BOTTOM ROW: Navigation */}
        <div className="w-full flex justify-center border-t-4 border-app-border pt-4 md:pt-5 border-dashed">
          <nav className="flex items-center justify-center gap-3 md:gap-6 flex-wrap font-sans">
            <TabButton 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              icon={<Library size={20} />}
              label="Library"
            />
            <TabButton 
              active={activeTab === 'scanner'} 
              onClick={() => setActiveTab('scanner')}
              icon={<Search size={20} />}
              label="Identify"
            />
            <TabButton 
              active={activeTab === 'generator'} 
              onClick={() => setActiveTab('generator')}
              icon={<Hammer size={20} />}
              label="Crafting"
            />
            <div className="relative">
              <button 
                onClick={() => setIsMarketplaceMenuOpen(!isMarketplaceMenuOpen)}
                className={`game-btn game-btn-outline px-3 py-2 md:px-6 md:py-3 flex items-center gap-1 md:gap-3 text-xs sm:text-sm md:text-xl ${isMarketplaceMenuOpen ? 'border-game-accent text-game-accent' : ''}`}
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" /> <span className="font-bold uppercase tracking-widest block">Marketplace</span> {isMarketplaceMenuOpen ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
              {isMarketplaceMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-app-surface border-4 border-app-border shadow-[8px_8px_0_rgba(0,0,0,0.5)] z-50">
                  <a href="https://www.tokopedia.com/" target="_blank" className="block px-4 py-3 text-sm font-bold uppercase hover:bg-app-accent hover:text-white transition-colors border-b-2 border-app-border">Tokopedia</a>
                  <a href="https://shopee.co.id/" target="_blank" className="block px-4 py-3 text-sm font-bold uppercase hover:bg-app-accent hover:text-white transition-colors border-b-2 border-app-border">Shopee</a>
                  <a href="https://www.lazada.co.id/" target="_blank" className="block px-4 py-3 text-sm font-bold uppercase hover:bg-app-accent hover:text-white transition-colors">Lazada</a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hamburger / Navigation Sidebar */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-[65px] md:top-[73px] left-0 bottom-0 w-64 bg-app-surface z-30 shadow-2xl p-6 overflow-y-auto border-r border-app-border animate-in slide-in-from-left duration-300">
            <h2 className="text-lg font-bold uppercase tracking-widest text-app-text-main mb-8 border-b border-app-border pb-4">Menu</h2>
            
            <ul className="space-y-4">
              <li>
                <button onClick={() => {setIsHistoryModalOpen(true); setIsMenuOpen(false);}} className="w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider border-4 border-app-border text-app-text-muted hover:border-game-accent hover:text-white transition-all">
                  Synthesize History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {setIsCheckupModalOpen(true); setIsMenuOpen(false);}} 
                  className="w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider border-4 border-app-border text-app-text-muted hover:border-game-accent hover:text-white transition-all"
                >
                  Personal Checkup
                </button>
              </li>
              <li>
                <button onClick={() => {setIsInstructionsModalOpen(true); setIsMenuOpen(false);}} className="w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider border-4 border-app-border text-app-text-muted hover:border-game-accent hover:text-white transition-all">
                  Instructions
                </button>
              </li>
              <li>
                <button onClick={() => {setIsAboutModalOpen(true); setIsMenuOpen(false);}} className="w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider border-4 border-app-border text-app-text-muted hover:border-game-accent hover:text-white transition-all">
                  About
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Checkup Modal */}
      {isCheckupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80">
          <div className="bg-app-surface border-4 border-app-border p-4 sm:p-8 w-full max-w-lg text-left overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black uppercase text-app-text-main mb-6">Personal Checkup</h2>
            <div className="space-y-4">
                {CONDITIONS.map(condition => (
                  <label key={condition} className="flex items-center gap-3 text-sm font-medium text-app-text-main cursor-pointer p-2 hover:bg-app-border border border-transparent hover:border-app-border">
                    <input
                      type="checkbox"
                      checked={medicalConditions.includes(condition)}
                      onChange={() => {
                        setMedicalConditions(prev =>
                          prev.includes(condition)
                            ? prev.filter(c => c !== condition)
                            : [...prev, condition]
                        );
                      }}
                      className="accent-game-accent"
                    />
                    {condition}
                  </label>
                ))}
            </div>
            <button 
              onClick={async () => {
                setIsCheckupModalOpen(false);
                if (medicalConditions.length > 0) {
                  setIsGeneratingAiStatus(true);
                  const result = await getCheckupStatus(medicalConditions);
                  setAiCheckupStatus(result.status);
                  setMaxVitals({
                    health: result.maxHealth || 100,
                    energy: result.maxEnergy || 100,
                    shield: result.maxShield || 100
                  });
                  setIsGeneratingAiStatus(false);
                } else {
                  setAiCheckupStatus("NORMAL CONDITION");
                  setMaxVitals({ health: 100, energy: 100, shield: 100 });
                }
              }} 
              className="mt-8 w-full game-btn game-btn-primary"
            >
              {isGeneratingAiStatus ? "PROCESSING..." : "Save Checkup"}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 mb-20 md:mb-0">
        {activeTab === 'dashboard' && (
          <Dashboard 
            activeCountry={activeCountry} 
            activeStyle={activeStyle} 
            activeCategory={activeCategory} 
            setActiveCountry={setActiveCountry}
            setActiveStyle={setActiveStyle}
            setActiveCategory={setActiveCategory}
            onSelectDish={setSelectedDish} 
            vitals={vitals}
            user={user}
          />
        )}
        {activeTab === 'scanner' && <Scanner onGenerate={(dish) => { setSelectedDish(dish); setActiveTab('dashboard'); }} />}
        {activeTab === 'generator' && <Generator onGenerate={(dish) => { setSelectedDish(dish); setActiveTab('dashboard'); }} />}
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden min-nav fixed bottom-0 left-0 right-0 p-3 flex justify-around z-20">
        <MobileNavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')}
          icon={<Info size={20} />}
          label="Dishes"
        />
        <MobileNavButton 
          active={activeTab === 'scanner'} 
          onClick={() => setActiveTab('scanner')}
          icon={<Camera size={20} />}
          label="Scanner"
        />
        <MobileNavButton 
          active={activeTab === 'generator'} 
          onClick={() => setActiveTab('generator')}
          icon={<ScrollText size={20} />}
          label="Generator"
        />
      </div>

      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-app-surface border-4 border-app-border p-4 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-black uppercase text-app-text-main mb-6">Synthesis History</h2>
            {synthesisHistory.length === 0 ? <p className="text-app-text-muted">No history found.</p> : (
              <ul className="space-y-4">
                {synthesisHistory.slice().reverse().map((entry, i) => (
                  <li key={i} className="p-4 border-2 border-app-border bg-app-bg/50">
                    <div className="font-bold text-game-accent">{entry.dishName}</div>
                    <div className="text-sm text-app-text-main">{entry.message}</div>
                    <div className="text-xs text-app-text-muted mt-1">{new Date(entry.timestamp).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setIsHistoryModalOpen(false)} className="mt-8 game-btn game-btn-primary">Close</button>
          </div>
        </div>
      )}
      
      {isMarketplaceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-app-surface border-4 border-app-border p-8 w-full max-w-lg text-center">
             <h2 className="text-2xl font-black uppercase text-app-text-main mb-6">Marketplace</h2>
             <p className="text-app-text-main mb-8">Access our generated marketplace for rare cooking materials.</p>
             <a href="https://marketplace.corn-kitchen.gen" target="_blank" className="game-btn game-btn-primary block w-full py-4 text-center">Open Marketplace</a>
             <button onClick={() => setIsMarketplaceModalOpen(false)} className="mt-4 w-full game-btn game-btn-outline">Close</button>
          </div>
        </div>
      )}

      {isInstructionsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-app-surface border-4 border-app-border p-8 w-full max-w-2xl text-left">
            <h2 className="text-2xl font-black uppercase text-app-text-main mb-6">Instructions</h2>
            <ol className="text-app-text-main space-y-4 list-decimal list-inside">
               <li><strong>Connect/Login:</strong> Sync your profile for persistent stats.</li>
               <li><strong>Dashboard:</strong> Browse dishes, filter by region/category.</li>
               <li><strong>Scanner:</strong> Use visual data to identify ingredients.</li>
               <li><strong>Generator:</strong> Forge new recipes from your inventory.</li>
               <li><strong>Synthesize:</strong> Cook selected recipes to gain buffs and increase status.</li>
            </ol>
            <button onClick={() => setIsInstructionsModalOpen(false)} className="mt-8 w-full game-btn game-btn-primary">Got it</button>
          </div>
        </div>
      )}

      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-app-surface border-4 border-app-border p-8 w-full max-w-lg text-center">
             <img src="https://image.pollinations.ai/prompt/technological%20generative%20cooking%20kitchen%20robot%20high%20quality?width=400&height=200&nologo=true" alt="About Corn" className="mb-6 border-2 border-app-border" />
             <h2 className="text-2xl font-black uppercase text-app-text-main mb-6">About CORN</h2>
             <p className="text-app-text-main mb-8">CORN World Kitchen is a generative cooking assistant.</p>
             <p className="text-app-text-muted mb-8 text-sm">Version 0.1-patch (C-Alpha)</p>
             <button onClick={() => setIsAboutModalOpen(false)} className="game-btn game-btn-primary">Close</button>
          </div>
        </div>
      )}

      {isWarningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-300">
          <div className="bg-app-surface border-4 border-game-magenta p-8 w-full max-w-lg text-center shadow-[0_0_40px_rgba(255,85,255,0.4)]">
             <div className="flex justify-center mb-6">
                <MinusCircle size={64} className="text-game-magenta animate-pulse" />
             </div>
             <h2 className="text-2xl font-black uppercase text-game-magenta mb-4">CRITICAL ALERT</h2>
             <p className="text-app-text-main mb-6 font-mono text-lg font-bold">{depletionWarning}</p>
             
             <div className="bg-app-bg border-2 border-app-border p-4 mb-8 text-left h-32 overflow-y-auto font-mono text-sm">
                {isFetchingRecommendation ? (
                   <span className="text-game-accent animate-pulse uppercase">Fetching neural recommendation...</span>
                ) : (
                   <Markdown remarkPlugins={[remarkGfm]}>{aiRecommendation}</Markdown>
                )}
             </div>

             <button onClick={() => setIsWarningModalOpen(false)} className="w-full game-btn bg-game-magenta hover:bg-game-magenta/80 text-white border-2 border-game-magenta">ACKNOWLEDGE</button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedDish && (
          <RecipeModal 
            dish={selectedDish} 
            onClose={() => setSelectedDish(null)} 
            vitals={vitals} 
            maxVitals={maxVitals}
            onVitalsUpdate={setVitals} 
            onSynthesize={(dishName, message) => setSynthesisHistory(prev => [...prev, {dishName, message, timestamp: Date.now()}])}
          />
        )}
      </AnimatePresence>
      <Chatbot />
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`game-btn ${active ? 'game-btn-primary' : 'game-btn-outline'} px-3 py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-xl`}
    >
      <span className="flex items-center gap-1 md:gap-2">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4 md:w-5 md:h-5' } as any)}
        <span className="font-bold uppercase tracking-widest">{label}</span>
      </span>
    </button>
  );
}

function HeroSlideshow() {
  const images = DISHES.slice(0, 5).map(d => d.image);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden border-b-4 border-app-border mb-8 sm:mb-12">
      <AnimatePresence mode='wait'>
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-app-bg/50 to-transparent flex items-end p-4 sm:p-8">
        <div className="max-w-4xl">
           <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-md">CORN</h1>
           <h2 className="text-xl sm:text-3xl font-bold text-game-green mt-2 mb-4 tracking-wide drop-shadow-md shrink-0">Craft Own Recipe and Nutrition</h2>
           <p className="text-sm sm:text-xl text-white mt-2 drop-shadow-md max-w-2xl leading-relaxed line-clamp-3 sm:line-clamp-none">Discover, synthesize, and track your nutritional intake with an AI-powered culinary assistant.</p>
        </div>
      </div>
    </div>
  );
}

function VitalBar({ icon, label, value, max, color, tooltip }: { icon: React.ReactNode, label: string, value: number, max: number, color: string, tooltip?: string }) {
  const displayValue = Math.min(value, max);
  const percentage = Math.min(100, Math.max(0, (displayValue / 100) * 100)); // Bar width relative to absolute 100
  const maxPercentage = Math.min(100, Math.max(0, (max / 100) * 100));
  const isLow = value <= 30;

  return (
    <div className={`flex items-center gap-2 sm:gap-3 w-24 sm:w-32 ${isLow ? 'animate-pulse' : ''}`} title={tooltip}>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center text-[10px] font-black tracking-widest leading-none">
          <div className="flex items-center gap-1">
            {icon}
            <span className={isLow ? 'text-game-magenta font-extrabold' : 'text-app-text-muted'}>{label}</span>
          </div>
          <span className={isLow ? 'text-game-magenta font-extrabold' : 'text-app-text-main'}>{Math.round(displayValue)}/{max}</span>
        </div>
        <div className={`h-2 bg-app-bg border ${isLow ? 'border-game-magenta shadow-[0_0_10px_rgba(255,85,255,0.7)]' : 'border-app-border'} relative overflow-hidden`}>
          {/* Background to show max limit */}
          <div className="absolute top-0 left-0 h-full bg-app-border opacity-50" style={{ width: `${maxPercentage}%` }}></div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`absolute top-0 left-0 h-full ${isLow ? 'bg-game-magenta' : color} transition-all duration-500`}
          />
        </div>
      </div>
    </div>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-none transition-all ${active ? 'text-game-accent scale-110 shadow-[0_-10px_20px_rgba(0,242,255,0.1)]' : 'text-app-text-muted'}`}
    >
      {icon}
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      {active && <div className="w-1.5 h-1.5 bg-game-accent rounded-full mt-1"></div>}
    </button>
  );
}

function DishCard({ dish, isFavorite, onToggleFavorite, onClick }: { dish: Dish; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void; onClick: () => void }) {
  const [showHealth, setShowHealth] = React.useState(false);
  const [healthLoading, setHealthLoading] = React.useState(false);
  const [aiHealthData, setAiHealthData] = React.useState<string | null>(null);

  const handleHealthClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextShow = !showHealth;
    setShowHealth(nextShow);

    if (nextShow && !aiHealthData && !healthLoading) {
      setHealthLoading(true);
      try {
        const ingredientNames = dish.ingredients 
          ? dish.ingredients.map(i => i.name) 
          : dish.scientificNames.map(s => s.ingredient);
        const insights = await getHealthInsights(dish.name, ingredientNames);
        setAiHealthData(insights);
      } catch (error) {
        console.error("Failed to fetch health insights:", error);
      } finally {
        setHealthLoading(false);
      }
    }
  };

  return (
      
    <div 
      className="game-card relative group cursor-pointer flex flex-col h-full overflow-hidden"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-app-bg/40">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
        />
        {/* Rarity/Category Tag */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-app-surface border-2 border-app-border text-[10px] font-bold text-game-accent uppercase tracking-widest">
          {dish.category === 'Food' ? 'STACK: FOOD' : 'STACK: POTION'}
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col relative w-full overflow-hidden">
        <div className="absolute -top-6 right-2 bg-app-surface w-10 h-10 flex items-center justify-center text-2xl border-2 border-app-border">
          {dish.emoji}
        </div>

        <div className="mt-2 text-left">
          <h3 className="font-bold text-lg text-app-text-main uppercase tracking-tight truncate pr-10 group-hover:text-game-accent transition-colors">
            {dish.name.replace(/\s*\(.*?\)\s*/g, '')}
          </h3>
          <div className="text-[10px] font-bold text-app-text-muted flex items-center flex-wrap gap-1 uppercase tracking-widest mt-1">
            <span className="text-game-magenta">{dish.country}</span>
            <span className="text-game-accent">| {dish.style}</span>
          </div>
        </div>
        
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t-2 border-app-border flex items-center justify-end">
            <div className="flex items-center gap-1">
              <button 
                onClick={onToggleFavorite}
                className={`p-1.5 sm:p-2 transition-all border-2 shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] active:translate-y-1 active:translate-x-1 active:shadow-none hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] ${isFavorite ? 'text-game-magenta border-game-magenta bg-game-magenta/10' : 'text-app-text-muted border-app-border hover:border-game-accent hover:text-game-accent bg-black/40'}`}
                title="Add to Chest"
              >
                <Heart size={14} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? 'animate-pulse' : ''} />
              </button>
            </div>
        </div>

        {showHealth && (
          <div className="absolute inset-0 z-20 p-5 bg-app-surface border-4 border-app-border text-sm text-app-text-main overflow-y-auto animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Close hint */}
            <div className="absolute top-2 right-2 text-game-accent cursor-pointer" onClick={handleHealthClick}>
               <X size={20} />
            </div>
            <div className="space-y-6">
              <div>
                <span className="block font-bold text-game-accent text-base uppercase tracking-widest mb-3 flex items-center gap-3">
                  <span className="w-3 h-5 bg-game-accent"></span>
                  Item Attributes
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-base font-bold">
                <div className="bg-app-surface border-4 border-app-border p-3 flex justify-between">
                  <span className="text-app-text-muted uppercase">Hunger</span>
                  <span className="text-app-text-main">{dish.nutrition.calories} <span className="text-sm">PTS</span></span>
                </div>
                <div className="bg-app-surface border-4 border-app-border p-3 flex justify-between">
                  <span className="text-app-text-muted uppercase">Str</span>
                  <span className="text-app-text-main">{dish.nutrition.protein} <span className="text-sm">G</span></span>
                </div>
                <div className="bg-app-surface border-4 border-app-border p-3 flex justify-between">
                  <span className="text-app-text-muted uppercase">Spd</span>
                  <span className="text-app-text-main">{dish.nutrition.carbohydrates} <span className="text-sm">G</span></span>
                </div>
                <div className="bg-app-surface border-4 border-app-border p-3 flex justify-between">
                  <span className="text-app-text-muted uppercase">Arm</span>
                  <span className="text-app-text-main">{dish.nutrition.fat} <span className="text-sm">G</span></span>
                </div>
              </div>
            </div>

            {healthLoading ? (
              <div className="flex items-center gap-4 py-3 font-bold text-base text-game-accent uppercase tracking-widest">
                <div className="w-5 h-5 border-4 border-game-accent border-t-transparent animate-spin"></div>
                <span className="animate-pulse">Consulting the Ancient Tomes...</span>
              </div>
            ) : aiHealthData ? (
              <div className="markdown-body text-base border-t-4 border-app-border pt-6 leading-tight">
                <Markdown>{aiHealthData}</Markdown>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="block font-bold text-game-green text-base uppercase tracking-widest mb-2 flex items-center gap-3">
                    <span className="w-3 h-5 bg-game-green"></span>
                    Enchantments
                  </span>
                  <p className="text-lg opacity-100 leading-tight pl-4 border-l-4 border-game-green/40 italic">{dish.healthBenefits}</p>
                </div>
                {dish.excessRisks && (
                  <div>
                    <span className="block font-bold text-game-magenta text-base uppercase tracking-widest mb-2 flex items-center gap-3">
                      <span className="w-3 h-5 bg-game-magenta"></span>
                      Curse Afflictions
                    </span>
                    <p className="text-lg opacity-100 leading-tight pl-4 border-l-4 border-game-magenta/40 italic text-app-text-muted">{dish.excessRisks}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ 
  activeCountry, 
  activeStyle, 
  activeCategory, 
  setActiveCountry,
  setActiveStyle,
  setActiveCategory,
  onSelectDish,
  vitals,
  user
}: { 
  activeCountry: string | null, 
  activeStyle: string | null, 
  activeCategory: string | null, 
  setActiveCountry: (c: string | null) => void,
  setActiveStyle: (s: 'Traditional' | 'Modern' | null) => void,
  setActiveCategory: (c: 'Food' | 'Beverage' | null) => void,
  onSelectDish: (d: Dish) => void,
  vitals: any,
  user: User | null
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [excludeQuery, setExcludeQuery] = React.useState('');
  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const favRef = collection(db, 'users', user.uid, 'favorites');
          const snap = await getDocs(favRef);
          const favs = snap.docs.map(doc => doc.id);
          setFavorites(favs);
          localStorage.setItem('favorites', JSON.stringify(favs));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }
  }, [user]);

  const toggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = favorites.includes(id);
    const newFavs = isFav ? favorites.filter((f: string) => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));

    if (user) {
      try {
        if (isFav) {
          await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
        } else {
          await setDoc(doc(db, 'users', user.uid, 'favorites', id), {
            recipeId: id,
            addedAt: serverTimestamp()
          });
        }
      } catch (error) {
        console.error("Error syncing favorite to Firestore:", error);
        // revert optimistic update on failure
        setFavorites(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }
  };

  const filteredDishes = DISHES.filter(d => {
    if (showFavoritesOnly && !favorites.includes(d.id)) return false;
    if (activeCountry && d.country !== activeCountry) return false;
    if (activeStyle && d.style !== activeStyle) return false;
    if (activeCategory && d.category !== activeCategory) return false;
    if (activeTags.length > 0 && (!d.tags || !activeTags.every(tag => d.tags!.includes(tag)))) return false;
    
    if (excludeQuery) {
      const excludedTerms = excludeQuery.toLowerCase().split(',').map(t => t.trim()).filter(Boolean);
      const hasExcluded = excludedTerms.some(term => 
        d.ingredients && d.ingredients.some(ing => ing.name.toLowerCase().includes(term))
      );
      if (hasExcluded) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inName = d.name.toLowerCase().includes(q);
      const inCountry = d.country.toLowerCase().includes(q);
      const inStyle = d.style.toLowerCase().includes(q);
      const inIngredients = d.ingredients && d.ingredients.some(ing => ing.name.toLowerCase().includes(q));
      if (!inName && !inIngredients && !inCountry && !inStyle) return false;
    }
    return true;
  });

  const countries = Array.from(new Set(DISHES.map(d => d.country)));
  const styles = ['Traditional', 'Modern'];
  const categories = ['Food', 'Beverage'];
  const allTags = Array.from(new Set(DISHES.flatMap(d => d.tags || []))).sort();

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <HeroSlideshow />

      <div className="flex gap-8 flex-col lg:flex-row lg:items-stretch items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-8">
          <div className="bg-app-surface/50 p-6 border-4 border-app-border space-y-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <h2 className="text-xl font-black uppercase text-app-text-main">Filters & Search</h2>
            {/* Search Bar (Moved here) */}
            <div className="space-y-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-game-accent" size={20} />
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  className="w-full pl-12 pr-4 py-3 bg-app-bg border-2 border-app-border text-app-text-main text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-game-accent transition-all placeholder:text-app-text-muted/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative group">
                <XCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-game-magenta" size={20} />
                <input 
                  type="text" 
                  placeholder="RESTRICTED..." 
                  className="w-full pl-12 pr-4 py-3 bg-app-bg border-2 border-app-border text-game-magenta text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-game-magenta transition-all placeholder:text-game-magenta/30"
                  value={excludeQuery}
                  onChange={(e) => setExcludeQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Module */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-app-text-muted uppercase tracking-[0.2em]">Biome</span>
                <select 
                  className="text-xs bg-app-bg border-2 border-app-border text-game-accent font-bold px-3 py-2 focus:outline-none focus:border-game-accent uppercase tracking-wider cursor-pointer hover:bg-app-border"
                  value={activeCountry || ''}
                  onChange={(e) => setActiveCountry(e.target.value || null)}
                >
                  <option value="">ALL</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-app-text-muted uppercase tracking-[0.2em]">Tier</span>
                <div className="flex flex-col bg-app-bg border-2 border-app-border">
                  <button 
                    onClick={() => setActiveStyle(null)}
                    className={`px-4 py-2 text-xs font-bold tracking-widest transition-all text-left ${!activeStyle ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
                  >
                    ALL TIERS
                  </button>
                  {styles.map(s => (
                    <button 
                      key={s}
                      onClick={() => setActiveStyle(s as any)}
                      className={`px-4 py-2 text-xs font-bold tracking-widest transition-all text-left ${activeStyle === s ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-app-text-muted uppercase tracking-[0.2em]">Class</span>
                <div className="flex flex-col bg-app-bg border-2 border-app-border">
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 text-xs font-bold tracking-widest transition-all text-left ${!activeCategory ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
                  >
                    ALL CLASSES
                  </button>
                  {categories.map(c => (
                    <button 
                      key={c}
                      onClick={() => setActiveCategory(c as any)}
                      className={`px-4 py-2 text-xs font-bold tracking-widest transition-all text-left ${activeCategory === c ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
                    >
                      {c.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-xs font-bold uppercase tracking-widest border-2 transition-all ${showFavoritesOnly ? 'bg-game-magenta border-game-magenta text-white' : 'bg-app-bg border-app-border text-app-text-muted hover:text-app-text-main'}`}
              >
                <Heart size={16} fill={showFavoritesOnly ? "currentColor" : "none"} />
                Loot Table
              </button>
            </div>
            
            {(activeCountry || activeStyle || activeCategory || activeTags.length > 0 || searchQuery || excludeQuery || showFavoritesOnly) && (
              <button 
                onClick={() => { setActiveCountry(null); setActiveStyle(null); setActiveCategory(null); setActiveTags([]); setSearchQuery(''); setExcludeQuery(''); setShowFavoritesOnly(false); }}
                className="w-full text-xs font-bold uppercase tracking-[0.2em] text-game-magenta hover:bg-game-magenta/10 px-4 py-2 border-2 border-game-magenta transition-all"
              >
                Reset Matrix
              </button>
            )}
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1">
          {/* Tags (optional: keep or remove? let's keep them on top of dishes) */}
          <div className="mb-8 p-4 bg-app-surface/50 border-4 border-app-border">
            <span className="text-sm font-bold text-app-text-muted uppercase tracking-[0.2em] mb-4 block">Tag Module Cluster</span>
            <div className="flex flex-wrap gap-2">
              {allTags.map(t => {
                const isActive = activeTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setActiveTags(prev => 
                        isActive ? prev.filter(tag => tag !== t) : [...prev, t]
                      );
                    }}
                    className={`px-3 py-1 text-xs font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${isActive ? 'bg-game-accent border-game-accent text-app-bg' : 'border-app-border text-app-text-muted hover:border-game-accent/50'}`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 bg-app-bg"></div>}
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredDishes.length === 0 ? (
            <div className="text-center p-20 bg-app-surface/20 border border-dashed border-app-border font-mono text-app-text-muted uppercase tracking-[0.3em]">
              Zero records found in selected sector.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {filteredDishes.map((dish, i) => (
                <DishCard 
                  key={i} 
                  dish={dish} 
                  isFavorite={favorites.includes(dish.id)}
                  onToggleFavorite={(e) => toggleFavorite(dish.id, e)}
                  onClick={() => onSelectDish(dish)} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Scanner({ onGenerate }: { onGenerate: (dish: Dish) => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Remove data:image/jpeg;base64, prefix
      const base64Data = image.split(',')[1];
      const res = await analyzeFoodImage(base64Data, mimeType);
      if (res) {
        const dish: Dish = JSON.parse(res);
        dish.id = 'scan-' + Date.now();
        dish.image = image;
        onGenerate(dish);
      }
    } catch (e) {
      console.error(e);
      alert("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4 border-l-4 border-game-accent pl-6 bg-app-surface/30 py-4">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter text-app-text-main uppercase">Visual Analyzer</h2>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed font-medium">Upload visual data for neural breakdown.</p>
      </div>

      <div className="game-card p-6 md:p-10">
        <div 
          className={`min-h-[350px] flex flex-col items-center justify-center relative border border-dashed transition-all ${
            isDragging 
              ? 'border-game-accent bg-game-accent/5' 
              : 'border-app-border bg-app-bg/40 hover:bg-app-bg/60'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute top-2 left-2 text-sm font-mono text-game-accent uppercase tracking-[0.2em]">Scanner Input Zone</div>
           {image ? (
            <div className="space-y-8 flex flex-col items-center w-full p-6">
              <div className="relative">
                <img src={image} className="max-h-72 object-contain border-4 border-app-border shadow-[4px_4px_0_rgba(0,0,0,0.5)]" alt="Visual data" />
                <div className="absolute top-0 left-0 w-full h-[4px] bg-game-accent animate-scanline"></div>
              </div>
              <div className="flex gap-6">
                <button 
                  onClick={() => setImage(null)} 
                  className="game-btn game-btn-outline"
                >
                  Reject
                </button>
                <button 
                  onClick={handleAnalyze} 
                  disabled={loading}
                  className="game-btn game-btn-primary flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : <><Search size={22} /> Decrypt</>}
                </button>
              </div>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-8 text-app-text-main hover:text-game-accent transition-all p-12 text-center w-full h-full">
              <div className="w-24 h-24 bg-app-surface shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-4 border-app-border flex items-center justify-center group transition-colors group-hover:border-game-accent">
                <Camera size={48} className="text-app-text-main group-hover:text-game-accent" />
              </div>
              <div className="space-y-3">
                <span className="font-bold text-2xl block uppercase tracking-widest">Transmit Visual Data</span>
                <span className="text-lg font-mono uppercase tracking-[0.2em]">Upload or Drop Stream</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      </div>

      {loading && (
         <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-12 h-12 border-4 border-game-accent border-t-transparent animate-spin"></div>
            <p className="text-game-accent font-mono text-xl animate-pulse tracking-[0.3em] uppercase">Neural Network Synchronizing...</p>
         </div>
      )}

    </div>
  );
}

function Generator({ onGenerate }: { onGenerate: (dish: Dish) => void }) {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleIngredients = ['Chicken', 'Rice', 'Garlic', 'Tofu', 'Spinach', 'Corn', 'Egg', 'Chili', 'Beef', 'Pork', 'Onion', 'Ginger', 'Turmeric', 'Coconut', 'Basil', 'Lemongrass', 'Lime'];

  const handleSampleClick = (item: string) => {
    const current = ingredients.trim();
    if (current.toLowerCase().includes(item.toLowerCase())) return;
    setIngredients(current ? `${current}, ${item}` : item);
  };

  const handleGenerate = async () => {
    if (!ingredients) return;
    setLoading(true);
    try {
      const res = await generateRecipeFromIngredients(ingredients, preferences);
      if (res) {
        const dish: Dish = JSON.parse(res);
        dish.id = 'gen-' + Date.now();
        dish.image = `https://image.pollinations.ai/prompt/delicious%20food%20photography%20of%20${encodeURIComponent(dish.name)}?width=800&height=400&nologo=true`;
        onGenerate(dish);
      }
    } catch (e) {
      console.error(e);
      alert("Error generating recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4 border-l-4 border-game-accent pl-6 bg-app-surface/30 py-4">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tighter text-app-text-main uppercase">Crafting Forge</h2>
        <p className="text-sm sm:text-base text-app-text-muted leading-relaxed font-medium">Synthesize new items using available raw components.</p>
      </div>

      <div className="game-card p-6 md:p-10 space-y-8">
                <div className="space-y-8 text-left">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
              <label className="text-sm sm:text-base font-bold text-game-accent uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-3 h-3 bg-game-accent"></span>
                Raw Materials Inventory
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {sampleIngredients.map(item => (
                  <button 
                    key={item}
                    onClick={() => handleSampleClick(item)}
                    className="text-[10px] sm:text-sm font-bold uppercase tracking-wider px-2 sm:px-3 py-1.5 sm:py-2 bg-game-accent/10 border-2 border-game-accent/40 text-game-accent hover:bg-game-accent hover:text-app-bg transition-all"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
            <textarea 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Input ingredients (e.g., chicken breast, garlic, rice...)" 
              className="w-full h-48 p-6 bg-app-bg/40 border-4 border-app-border text-app-text-main text-lg font-bold focus:outline-none focus:border-game-accent transition-all resize-none placeholder:text-app-text-muted/40"
            />
          </div>

          <div className="space-y-4">
            <label className="text-base font-bold text-game-magenta uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-3 h-3 bg-game-magenta"></span>
              Buff Preferences
            </label>
            <input 
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              type="text" 
              placeholder="e.g., maximum protein, low sodium, keto-optimized..." 
              className="w-full p-6 bg-app-bg/40 border-4 border-app-border text-game-magenta text-lg font-bold focus:outline-none focus:border-game-magenta transition-all placeholder:text-game-magenta/40"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !ingredients}
            className="game-btn game-btn-primary w-full py-6 text-2xl disabled:opacity-50"
          >
            {loading ? 'Synthesizing...' : 'Run Forge Algorithm'}
          </button>
        </div>

      </div>

      {loading && (
         <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-12 h-12 border-4 border-game-accent border-t-transparent animate-spin"></div>
            <p className="text-game-accent font-mono text-xl animate-pulse tracking-[0.3em] uppercase">Compiling Blueprint...</p>
         </div>
      )}

    </div>
  );
}

function RecipeModal({ dish, onClose, vitals, maxVitals, onVitalsUpdate, onSynthesize }: { dish: Dish, onClose: () => void, vitals: any, maxVitals: any, onVitalsUpdate: (v: any) => void, onSynthesize: (dishName: string, message: string) => void }) {
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceData, setPriceData] = useState<string | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthData, setHealthData] = useState<string | null>(null);

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisMessage, setSynthesisMessage] = useState<{ text: string, type: 'plus' | 'minus' | 'buff' } | null>(null);

  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [variationLoading, setVariationLoading] = useState(false);
  const [variationRecipe, setVariationRecipe] = useState<string | null>(null);

  const handleCheckVariation = async (variationName: string) => {
    if (selectedVariation === variationName) {
       setSelectedVariation(null);
       setVariationRecipe(null);
       return;
    }
    setSelectedVariation(variationName);
    setVariationLoading(true);
    try {
      let ingredientNames: string[] = [];
      if (dish.ingredients && dish.ingredients.length > 0) {
        ingredientNames = dish.ingredients.map(ing => ing.name);
      } else if (dish.scientificNames && dish.scientificNames.length > 0) {
        ingredientNames = dish.scientificNames.map(sn => sn.ingredient);
      }

      const recipe = await getVariationRecipe(dish.name, variationName, ingredientNames);
      setVariationRecipe(recipe);
    } catch(e) {
      setVariationRecipe("Failed to generate recipe.");
    } finally {
      setVariationLoading(false);
    }
  };

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    
    // Synthesis Logic
    const newVitals = { ...vitals };
    let message = "";
    let type: 'plus' | 'minus' | 'buff' = 'plus';

    const calories = parseInt(dish.nutrition.calories) || 0;
    const fat = parseInt(dish.nutrition.fat) || 0;
    const protein = parseInt(dish.nutrition.protein) || 0;
    const carbs = parseInt(dish.nutrition.carbohydrates?.replace(/[^0-9]/g, '') || '0') || 0;

    const isJunk = calories > 800 || fat > 40 || dish.name.toLowerCase().includes('burger') || dish.name.toLowerCase().includes('pizza') || dish.name.toLowerCase().includes('hot dog');
    const isFried = dish.name.toLowerCase().includes('fried') || dish.desc.toLowerCase().includes('fried') || dish.name.toLowerCase().includes('goreng');
    const isGrilled = dish.name.toLowerCase().includes('grilled') || dish.desc.toLowerCase().includes('grilled') || dish.name.toLowerCase().includes('bakar');
    const isAlcoholic = dish.desc.toLowerCase().includes('alcohol') || dish.name.toLowerCase().includes('beer') || dish.name.toLowerCase().includes('wine') || dish.desc.toLowerCase().includes('fermented');
    
    const isHealthy = !isJunk && !isFried && !isAlcoholic && !isGrilled && (calories < 550 && fat < 25);
    const isProtein = protein > 35;
    const isHighCarb = carbs > 40;
    const isBeverage = dish.category === 'Beverage';

    let energyDelta = 0;
    let isToxic = isJunk || isFried || isGrilled || isAlcoholic;
    
    let toxicityTypes = [];
    if (isJunk) toxicityTypes.push('LIPID OVERLOAD');
    if (isFried) toxicityTypes.push('OIL SATURATION');
    if (isGrilled) toxicityTypes.push('CARCINOGENIC TRACES');
    if (isAlcoholic) toxicityTypes.push('NEUROTOXIN DETECTED');

    if (isHealthy) {
      newVitals.health = Math.min(maxVitals.health, vitals.health + 10);
      newVitals.shield = Math.min(maxVitals.shield, vitals.shield + 5);
      energyDelta = 10;
      message = "VITALITY RESTORED: +10 HP, +5 SHD";
      type = 'plus';
    } else if (isToxic) {
      const shieldDmg = (isJunk ? 20 : 0) + (isFried ? 15 : 0) + (isGrilled ? 10 : 0) + (isAlcoholic ? 25 : 0);
      const hpDmg = (isJunk ? 10 : 0) + (isFried ? 5 : 0) + (isAlcoholic ? 15 : 0);
      const nrgDmg = (isJunk ? 15 : 0) + (isAlcoholic ? 20 : 0) + (isHighCarb ? -25 : 0); // High carb can offset nrg loss
      
      newVitals.health = Math.max(1, vitals.health - hpDmg);
      newVitals.shield = Math.max(0, vitals.shield - shieldDmg);
      energyDelta = -nrgDmg;
      
      message = `TOXICITY DETECTED: -${hpDmg} HP | ${energyDelta < 0 ? energyDelta : '+'+energyDelta} NRG | -${shieldDmg} SHD (${toxicityTypes.join(', ')})`;
      type = 'minus';
    } else {
      newVitals.health = Math.min(maxVitals.health, vitals.health + 5);
      energyDelta = 5;
      message = "NUTRIENTIAL GAIN: +5 HP";
      type = 'plus';
    }

    if (isHighCarb && !isToxic) {
      energyDelta = Math.max(energyDelta, 25);
      message += " | HIGH CARB ENERGY SPIKE!";
      type = 'buff';
    } else if (isProtein && !isToxic) {
      energyDelta += 10;
      message += " | PROTEIN BOOST!";
      type = 'buff';
    }

    if (isBeverage && !isAlcoholic && !isToxic) {
      newVitals.shield = Math.min(maxVitals.shield, vitals.shield + 15);
      message += " | HYDRATION SHIELD RECHARGED!";
      type = 'buff';
    }

    newVitals.energy = Math.min(maxVitals.energy, Math.max(0, (vitals.energy || maxVitals.energy) + energyDelta));
    if (energyDelta > 0 && !isJunk) {
      message += ` | +${energyDelta} NRG`;
    }

    onSynthesize(dish.name, message);
    setSynthesisMessage({ text: message, type });
    onVitalsUpdate(newVitals);

    // Persist to Firebase if logged in
    if (auth.currentUser) {
      try {
        await updateUserVitals(auth.currentUser.uid, newVitals);
      } catch (err) {
        console.error("Failed to persist vitals:", err);
      }
    }

    setTimeout(() => {
      setIsSynthesizing(false);
      setTimeout(() => setSynthesisMessage(null), 3000);
    }, 1500);
  };
  
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    // Save previous focus
    previousFocus.current = document.activeElement as HTMLElement;
    
    // Set focus to the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      // Return focus
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [onClose]);

  const handleCheckPrice = async () => {
    try {
      setPriceLoading(true);
      let ingredientNames: string[] = [];
      if (dish.ingredients && dish.ingredients.length > 0) {
        ingredientNames = dish.ingredients.map(ing => ing.name);
      } else if (dish.scientificNames && dish.scientificNames.length > 0) {
        ingredientNames = dish.scientificNames.map(sn => sn.ingredient);
      }
      
      const result = await getIngredientPrices(ingredientNames);
      setPriceData(result);
    } catch (err) {
      console.error(err);
      setPriceData("Failed to fetch market prices. Please try again.");
    } finally {
      setPriceLoading(false);
    }
  };

  const handleCheckHealth = async () => {
    try {
      setHealthLoading(true);
      let ingredientNames: string[] = [];
      if (dish.ingredients && dish.ingredients.length > 0) {
        ingredientNames = dish.ingredients.map(ing => ing.name);
      } else if (dish.scientificNames && dish.scientificNames.length > 0) {
        ingredientNames = dish.scientificNames.map(sn => sn.ingredient);
      }
      
      const result = await getHealthInsights(dish.name, ingredientNames);
      setHealthData(result);
    } catch (err) {
      console.error(err);
      setHealthData("Failed to fetch health insights. Please try again.");
    } finally {
      setHealthLoading(false);
    }
  };

  return (
    <motion.div 
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        
        {/* Header Image Area */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-game-accent/30">
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-app-bg/40 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-app-surface border-4 border-app-border hover:border-game-accent hover:text-game-accent transition-all text-app-text-main z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-app-text-main w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
              <span className="text-4xl sm:text-5xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" role="img" aria-label="dish-emoji">{dish.emoji}</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-game-magenta border-2 border-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">{dish.country}</span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-game-accent border-2 border-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">{dish.style}</span>
              </div>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase mb-2 sm:mb-3 text-game-accent drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
              {dish.name.replace(/\s*\(.*?\)\s*/g, '')}
            </h2>
            <p className="text-white max-w-2xl text-sm sm:text-base md:text-xl font-medium leading-tight bg-black/60 p-3 sm:p-5 border-l-[4px] sm:border-l-[8px] border-game-accent mb-4">
              {dish.desc}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white">
              {dish.servings && <div className="bg-black/60 px-2 sm:px-4 py-1 sm:py-2 border border-white/20">Servings: {dish.servings}</div>}
              {dish.prepTime && <div className="bg-black/60 px-2 sm:px-4 py-1 sm:py-2 border border-white/20">Prep: {dish.prepTime} min</div>}
              {dish.cookTime && <div className="bg-black/60 px-2 sm:px-4 py-1 sm:py-2 border border-white/20">Cook: {dish.cookTime} min</div>}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 bg-app-bg">
          <div className="flex flex-col gap-6 sm:gap-10">
            
            {/* Ingredients & Recipe */}
            <div className="flex-1 space-y-6 sm:space-y-8">
              {/* How to Craft Section */}
              <div className="p-4 sm:p-6 md:p-8 bg-app-surface border-4 border-app-border">
                <h3 className="text-lg sm:text-xl font-black border-b-4 border-app-border pb-3 sm:pb-4 mb-4 sm:mb-6 flex items-center gap-3 text-app-text-main uppercase tracking-widest">
                  <Pickaxe className="text-game-accent" size={24} /> How to Craft
                </h3>
                <div className="markdown-body text-app-text-main text-sm sm:text-base md:text-lg leading-snug">
                  <Markdown remarkPlugins={[remarkGfm]}>{dish.recipe}</Markdown>
                </div>
              </div>

              {/* Variations Section */}
              {dish.variations && dish.variations.length > 0 && (
                <div className="p-4 sm:p-6 md:p-8 bg-app-surface border-4 border-app-border">
                  <h3 className="text-lg sm:text-xl font-black border-b-4 border-app-border pb-3 sm:pb-4 mb-4 sm:mb-6 flex items-center gap-3 text-app-text-main uppercase tracking-widest">
                    <Search className="text-game-accent" size={24} /> Known Variations
                  </h3>
                  <div className="flex flex-col gap-4">
                    {dish.variations.map(variation => (
                      <div key={variation} className="border-2 border-app-border p-4">
                        <button
                          onClick={() => handleCheckVariation(variation)}
                          className="w-full text-left font-bold text-game-accent uppercase tracking-wider flex items-center justify-between"
                        >
                          {variation}
                          <span>{selectedVariation === variation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
                        </button>
                        {selectedVariation === variation && (
                          <div className="mt-4 pt-4 border-t-2 border-app-border">
                            {variationLoading ? (
                              <div className="flex items-center gap-3 text-game-accent font-mono text-sm animate-pulse">
                                <div className="w-4 h-4 border-2 border-game-accent border-t-transparent rounded-full animate-spin"></div>
                                Extracting data...
                              </div>
                            ) : variationRecipe ? (
                              <div className="markdown-body text-app-text-main text-sm sm:text-base leading-snug">
                                <Markdown remarkPlugins={[remarkGfm]}>{variationRecipe}</Markdown>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Intelligence & Systems */}
            <div className="w-full space-y-6 sm:space-y-10">
              <div className="p-4 sm:p-6 md:p-8 bg-app-surface border-4 border-app-border flex flex-col gap-4 sm:gap-6 relative">
                 {/* ...rest of existing right column code... */}
                 <div className="absolute top-0 right-0 p-2 text-sm font-mono text-game-accent uppercase tracking-widest">Analyzer</div>
                 <div className="pt-2">
                   <h3 className="text-base font-bold text-app-text-main uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Search size={18} className="text-game-accent" /> Market Value
                   </h3>
                   <p className="text-sm text-app-text-muted mb-5 leading-relaxed font-medium">Query live market clusters for ingredient credits estimation.</p>
                   
                   {!priceData && (
                     <button 
                       onClick={handleCheckPrice}
                       disabled={priceLoading}
                       className="game-btn game-btn-outline w-full py-4 text-base"
                     >
                       {priceLoading ? 'Searching...' : 'Scan Market'}
                     </button>
                   )}
 
                   {priceLoading && !priceData && (
                     <div className="flex justify-center mt-6">
                       <div className="w-8 h-8 border-4 border-game-accent border-t-transparent rounded-full animate-spin"></div>
                     </div>
                   )}
 
                   {priceData && (
                     <div className="mt-6 p-6 bg-app-bg/40 border-4 border-app-border text-base font-medium markdown-body overflow-x-auto">
                       <Markdown remarkPlugins={[remarkGfm]}>{priceData}</Markdown>
                     </div>
                   )}
                 </div>
              </div>
              
              <div className="p-4 sm:p-8 bg-app-surface border-4 border-app-border space-y-8 relative">
                 {/* ...rest of existing right column code... */}
                 <div className="absolute top-0 right-0 p-2 text-sm font-mono text-game-magenta uppercase tracking-widest">System Health</div>
                 <h3 className="text-base font-bold uppercase tracking-[0.3em] text-game-magenta flex items-center gap-4 border-b-4 border-app-border pb-4">
                   <HeartPulse className="text-game-magenta" size={24} /> OS Vitals
                 </h3>
                 
                 <div className="space-y-8 text-lg">
                   <div>
                     <h4 className="text-sm font-bold text-app-text-muted uppercase tracking-[0.2em] mb-4">Core Attributes</h4>
                     <div className="grid grid-cols-2 gap-4 font-mono">
                       <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center" title="Total energy provided by this dish.">
                         <span className="text-sm uppercase text-app-text-main mb-1 font-black">Energy</span>
                         <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.calories}</span>
                       </div>
                       <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                         <span className="text-sm uppercase text-app-text-main mb-1 font-black" title="Proteins for muscle repair and system growth.">Power</span>
                         <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.protein}</span>
                       </div>
                       <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                         <span className="text-sm uppercase text-app-text-main mb-1 font-black" title="Carbohydrates for quick energy synthesis.">Fuel</span>
                         <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.carbohydrates}</span>
                       </div>
                       <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                         <span className="text-sm uppercase text-app-text-main mb-1 font-black" title="Fats for long-term reserves and module insulation.">Buffer</span>
                         <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.fat}</span>
                       </div>
                     </div>
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-green-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                        <span className="w-3 h-3 bg-green-400 animate-pulse"></span>
                        Active Buffs
                     </h4>
                     <p className="text-base text-app-text-muted leading-relaxed font-medium bg-black/40 p-4 border-l-4 border-green-400">{dish.healthBenefits}</p>
                   </div>
                   {dish.excessRisks && (
                     <div>
                       <h4 className="text-sm font-bold text-game-magenta uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                         <span className="w-3 h-3 bg-game-magenta animate-pulse"></span>
                         Critical Failures
                       </h4>
                       <p className="text-base text-app-text-muted leading-relaxed font-medium bg-black/40 p-4 border-l-4 border-game-magenta">{dish.excessRisks}</p>
                     </div>
                   )}
                 </div>
                 
                 <div className="pt-8 border-t-4 border-app-border mt-6">
                   <h3 className="text-base font-bold text-app-text-main uppercase tracking-widest mb-4 flex items-center gap-4"><HeartPulse size={24} className="text-game-magenta" /> Neural Insights</h3>
                   <p className="text-sm text-app-text-muted mb-5 leading-relaxed font-medium">AI-driven predictive analysis on bio-synchronization and legacy disease mitigation.</p>
                   
                   {!healthData && (
                     <button 
                       onClick={handleCheckHealth}
                       disabled={healthLoading}
                       className="game-btn game-btn-primary w-full py-5 uppercase tracking-[0.2em] text-xl"
                     >
                       {healthLoading ? 'Analyzing...' : 'Run Bio-Diagnostics'}
                     </button>
                   )}
 
                   {healthLoading && !healthData && (
                     <div className="flex justify-center mt-6">
                       <div className="w-10 h-10 border-4 border-game-magenta border-t-transparent animate-spin"></div>
                     </div>
                   )}
 
                   {healthData && (
                     <div className="mt-8 p-8 bg-app-bg/40 border-4 border-app-border text-lg font-medium markdown-body">
                       <Markdown remarkPlugins={[remarkGfm]}>{healthData}</Markdown>
                     </div>
                   )}
                 </div>
 
                 <div className="pt-8 border-t-4 border-app-border">
                   <h3 className="text-base font-bold text-game-accent uppercase tracking-widest mb-4 flex items-center gap-4"><Pickaxe size={24} /> Synthesis Node</h3>
                   <p className="text-sm text-app-text-muted mb-6 leading-relaxed">Execute the synthesis algorithm to incorporate this blueprint into your bio-matrix. (updated)</p>
                   
                   <div className="relative">
                     <button 
                       onClick={handleSynthesize}
                       disabled={isSynthesizing}
                       className={`game-btn w-full py-4 sm:py-6 text-xl sm:text-2xl uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black transition-all ${isSynthesizing ? 'bg-app-border text-app-text-muted' : 'game-btn-primary border-4 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:scale-[1.02]'}`}
                     >
                       {isSynthesizing ? 'Processing...' : 'Synthesize Item'}
                     </button>
                     
                     <AnimatePresence>
                       {synthesisMessage && (
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className={`absolute -top-20 left-0 right-0 p-4 text-center text-sm font-black uppercase tracking-widest border-4 ${synthesisMessage.type === 'plus' ? 'bg-game-green/90 border-game-green text-white' : synthesisMessage.type === 'minus' ? 'bg-game-magenta/90 border-game-magenta text-white' : 'bg-game-accent/90 border-game-accent text-white'}`}
                         >                            <div className="flex flex-col items-center gap-2">
                              {synthesisMessage.type === 'plus' && <PlusCircle size={32} />}
                              {synthesisMessage.type === 'minus' && <MinusCircle size={32} />}
                              {synthesisMessage.type === 'buff' && <Zap size={32} />}
                              <span className="text-xl font-black">{synthesisMessage.text}</span>
                            </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
