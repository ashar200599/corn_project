console.log('App.tsx is evaluating...');
import React, { useState, useEffect } from 'react';
import { ChefHat, Camera, ScrollText, HeartPulse, Search, Info, Menu, X, XCircle, Heart, Sun, Moon, Hammer, Library, Sword, Pickaxe, Map, Apple, UserCircle, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { analyzeFoodImage, generateRecipeFromIngredients, getIngredientPrices, getHealthInsights } from './services/geminiService';
import { DISHES, Dish } from './data/dishes';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, syncUserProfile, db, updateUserVitals } from './lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'generator'>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [vitals, setVitals] = useState({ health: 100, shield: 50, attack: 10 });
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

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
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfile(result.user);
      }
    } catch (error) {
      console.error("Login failed:", error);
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

  return (
    <div className="min-h-screen flex flex-col font-sans bg-app-bg text-app-text-main relative transition-colors duration-300">
      {/* Top Navigation */}
      <header className="bg-app-surface border-b-4 border-app-border py-6 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
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
            <div className="w-10 h-10 bg-game-green/20 border-2 border-app-border flex items-center justify-center rounded-none shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
              <span className="text-2xl">🌽</span>
            </div>
            <div className="font-game">
              <div className="text-2xl font-black tracking-[0.2em] text-app-text-main uppercase leading-none">
                CORN
              </div>
              <div className="text-lg font-mono text-game-green flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 bg-game-green animate-pulse"></span>
                WORLD: KITCHEN
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-8 px-6 py-2 bg-app-bg/60 border-2 border-app-border">
            <VitalBar icon={<Heart className="text-game-magenta" size={14} fill="currentColor" />} label="HP" value={vitals.health} max={100} color="bg-game-magenta" />
            <VitalBar icon={<Sword className="text-game-accent" size={14} />} label="ATK" value={vitals.attack} max={99} color="bg-game-accent" />
            <VitalBar icon={<Pickaxe className="text-game-green" size={14} />} label="SHD" value={vitals.shield} max={100} color="bg-game-green" />
          </div>

          <nav className="hidden lg:flex gap-2">
            <TabButton 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              icon={<Library size={16} />}
              label="Library"
            />
            <TabButton 
              active={activeTab === 'scanner'} 
              onClick={() => setActiveTab('scanner')}
              icon={<Search size={16} />}
              label="Identify"
            />
            <TabButton 
              active={activeTab === 'generator'} 
              onClick={() => setActiveTab('generator')}
              icon={<Hammer size={16} />}
              label="Crafting"
            />
          </nav>

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-none border border-app-border bg-app-surface hover:border-game-accent text-app-text-muted hover:text-game-accent transition-all shadow-sm"
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
                  className="flex items-center gap-2 p-1.5 border-2 border-app-border bg-app-bg hover:border-game-accent transition-all group"
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
      </header>

      {/* Hamburger / Navigation Sidebar */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-[65px] md:top-[73px] left-0 bottom-0 w-64 bg-app-surface z-30 shadow-2xl p-6 overflow-y-auto border-r border-app-border animate-in slide-in-from-left duration-300">
            <h2 className="font-game text-lg font-bold uppercase tracking-widest text-app-text-main mb-8 border-b border-app-border pb-4">Categories</h2>
            
            <div className="space-y-10">
              <div>
                <h3 className="font-game text-sm font-bold uppercase tracking-[0.2em] text-app-text-main mb-4">By Region</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => { setActiveCountry(null); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeCountry === null ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      Global All
                    </button>
                  </li>
                  {countries.map(c => (
                    <li key={c}>
                      <button 
                        onClick={() => { setActiveCountry(c); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                        className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeCountry === c ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-game text-sm font-bold uppercase tracking-[0.2em] text-app-text-main mb-4">By Class</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => { setActiveCategory(null); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeCategory === null ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      Total Class
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveCategory('Food'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeCategory === 'Food' ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      Food Units
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveCategory('Beverage'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeCategory === 'Beverage' ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      Beverage Units
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-game text-sm font-bold uppercase tracking-[0.2em] text-app-text-main mb-4">By Tier</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => { setActiveStyle(null); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeStyle === null ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      All Tiers
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveStyle('Traditional'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeStyle === 'Traditional' ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      Traditional
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveStyle('Modern'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-4 ${activeStyle === 'Modern' ? 'bg-game-accent text-app-bg border-game-accent' : 'border-app-border text-app-text-muted hover:text-white hover:bg-app-border'}`}
                    >
                      Modern Spec
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-none w-full p-4 md:p-8 mb-20 md:mb-0">
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
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'scanner' && <Scanner />}
        {activeTab === 'generator' && <Generator />}
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

      <AnimatePresence>
        {selectedDish && (
          <RecipeModal 
            dish={selectedDish} 
            onClose={() => setSelectedDish(null)} 
            vitals={vitals} 
            onVitalsUpdate={setVitals} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`game-btn ${active ? 'game-btn-primary' : 'game-btn-outline'} gap-2`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function VitalBar({ icon, label, value, max, color }: { icon: React.ReactNode, label: string, value: number, max: number, color: string }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-3 w-32">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center text-[10px] font-black tracking-widest leading-none">
          <div className="flex items-center gap-1">
            {icon}
            <span className="text-app-text-muted">{label}</span>
          </div>
          <span className="text-app-text-main">{Math.round(value)}</span>
        </div>
        <div className="h-2 bg-app-bg border border-app-border relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`h-full ${color} transition-all duration-500`}
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
      className="game-card group cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image Container with Hover Overlay for Scientific Names */}
      <div className="relative h-56 w-full overflow-hidden bg-app-bg/40">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-app-surface/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center border-b border-game-accent/20">
          <h4 className="text-game-accent text-sm font-black mb-3 uppercase tracking-[0.3em]">Codename</h4>
          {dish.scientificNames.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <span className="text-app-text-main text-xl font-bold block">{dish.scientificNames[0].ingredient}</span>
              <div className="text-app-text-main font-mono text-sm mt-2 tracking-widest bg-app-bg/60 px-3 py-2 border-l-4 border-game-accent">
                {dish.scientificNames[0].name}
              </div>
            </div>
          )}
        </div>
        {/* Rarity/Category Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-app-surface border-4 border-app-border text-base font-bold text-game-accent uppercase tracking-widest">
          {dish.category === 'Food' ? 'STACK: FOOD' : 'STACK: POTION'}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col relative">
        <div className="absolute -top-10 right-6 bg-app-surface w-16 h-16 flex items-center justify-center text-4xl border-4 border-app-border shadow-[4px_4px_0_rgba(0,0,0,0.5)] group-hover:border-game-accent transition-colors">
          {dish.emoji}
        </div>

        <div className="mt-2 space-y-1">
          <h3 className="font-game font-bold text-2xl text-app-text-main uppercase tracking-tight truncate pr-14 group-hover:text-game-accent transition-colors">
            {dish.name.replace(/\s*\(.*?\)\s*/g, '')}
          </h3>
          <div className="font-game text-base font-bold text-app-text-muted flex items-center gap-2 uppercase tracking-widest">
            <span className="text-game-magenta">BIOME:</span> {dish.country}
            <span className="w-2 h-2 bg-app-border"></span>
            <span className="text-game-accent">TIER:</span> {dish.style}
          </div>
        </div>
        
        <p className="text-lg text-app-text-muted mt-4 line-clamp-2 leading-tight flex-1 font-medium bg-black/40 p-3 border-l-4 border-app-border">
          {dish.desc}
        </p>

        <div className="mt-4 pt-4 border-t-4 border-app-border flex items-center justify-between">
            <span className="text-base font-bold uppercase tracking-widest text-app-text-muted group-hover:text-game-accent transition-all flex items-center gap-2">
              <Pickaxe size={18} className="text-game-accent" />
              Mine Data
            </span>
            <div className="flex items-center gap-3">
              <button 
                onClick={onToggleFavorite}
                className={`p-2 transition-all border-4 ${isFavorite ? 'text-game-magenta border-game-magenta bg-game-magenta/10 shadow-[4px_4px_0_rgba(255,85,255,0.2)]' : 'text-app-text-muted border-app-border hover:border-app-text-muted hover:text-game-accent bg-black/40'}`}
                title="Add to Chest"
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={handleHealthClick}
                className={`text-base font-bold uppercase tracking-widest flex items-center gap-2 px-4 py-2 transition-all border-4 ${showHealth ? 'bg-game-magenta text-white border-game-magenta shadow-[4px_4px_0_rgba(255,85,255,0.3)]' : 'text-game-magenta bg-game-magenta/5 border-game-magenta/30 hover:bg-game-magenta/20'}`}
              >
                <Sword size={18} /> Stats
              </button>
            </div>
        </div>

        {showHealth && (
          <div className="mt-4 p-5 bg-black/60 border-4 border-app-border text-sm text-app-text-main space-y-6 animate-in slide-in-from-top-2" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="block font-bold text-game-accent text-base uppercase tracking-widest mb-3 flex items-center gap-3">
                <span className="w-3 h-5 bg-game-accent"></span>
                Item Attributes
              </span>
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
  setActiveTab
}: { 
  activeCountry: string | null, 
  activeStyle: string | null, 
  activeCategory: string | null, 
  setActiveCountry: (c: string | null) => void,
  setActiveStyle: (s: 'Traditional' | 'Modern' | null) => void,
  setActiveCategory: (c: 'Food' | 'Beverage' | null) => void,
  onSelectDish: (d: Dish) => void,
  vitals: any,
  setActiveTab: (t: 'dashboard' | 'scanner' | 'generator') => void
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [excludeQuery, setExcludeQuery] = React.useState('');
  const [activeTags, setActiveTags] = React.useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const heroImages = React.useMemo(() => DISHES.map(d => d.image), []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev: string[]) => {
      const isFav = prev.includes(id);
      const newFavs = isFav ? prev.filter((f: string) => f !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return newFavs;
    });
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
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Banner Section */}
      <div className="-mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-16 relative z-0">
        <div className="hero-banner relative">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={heroImages[currentImageIndex]} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              alt="Featured Recipe" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[20%] transition-all duration-1000 scale-105"
            />
          </AnimatePresence>
          <div className="hero-overlay">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-block px-4 py-1 bg-game-accent text-app-bg font-game font-bold text-sm uppercase tracking-[0.3em]">
                Latest Patch v1.25
              </div>
              <h2 className="text-7xl md:text-8xl font-game font-black tracking-tight text-white uppercase leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)]">
                CORN <span className="text-game-accent">SYSTEM</span>
              </h2>
              <p className="text-xl md:text-2xl text-white leading-tight font-medium bg-[#0a0a0c]/90 p-8 border-l-8 border-game-accent shadow-[10px_10px_0_rgba(0,0,0,0.5)]">
                Experience the next evolution in <strong className="text-game-accent font-black">Culinary Synthesis</strong>. 
                Discover traditional biomes and modernize your nutritional inventory with neural-powered insights.
              </p>
              <div className="flex flex-row gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('generator')}
                  className="game-btn game-btn-primary px-8 py-3 text-2xl shadow-[0_0_20px_rgba(124,163,55,0.4)] text-white"
                >
                  Quick Forge
                </button>
                <button className="game-btn game-btn-outline px-8 py-3 text-2xl flex items-center gap-3 text-[#373737]">
                  <ScrollText size={22} /> Patch Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 px-4 md:px-0">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-game-accent" size={24} />
            <input 
              type="text" 
              placeholder="SEARCH LIBRARY (Recipe, Ingredient, Biome...)" 
              className="w-full pl-14 pr-4 py-5 bg-app-surface border-4 border-app-border text-app-text-main text-lg font-bold uppercase tracking-widest focus:outline-none focus:border-game-accent transition-all placeholder:text-app-text-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative flex-[0.7] group">
            <XCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-game-magenta" size={24} />
            <input 
              type="text" 
              placeholder="RESTRICTED MATERIALS (e.g. peanut, pork)" 
              className="w-full pl-14 pr-4 py-5 bg-app-surface border-4 border-app-border text-game-magenta text-lg font-bold uppercase tracking-widest focus:outline-none focus:border-game-magenta transition-all placeholder:text-game-magenta/30"
              value={excludeQuery}
              onChange={(e) => setExcludeQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-8 bg-app-surface/50 p-8 border-4 border-app-border relative">
          <div className="absolute top-0 right-0 p-3 text-sm font-mono text-game-accent uppercase tracking-[0.2em] bg-app-surface border-l-4 border-b-4 border-app-border">Filter Set Loaded</div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-app-text-main uppercase tracking-[0.2em]">Biome</span>
            <select 
              className="text-sm bg-app-surface border-4 border-app-border text-game-accent font-bold px-4 py-3 focus:outline-none focus:border-game-accent uppercase tracking-wider cursor-pointer hover:bg-app-border"
              value={activeCountry || ''}
              onChange={(e) => setActiveCountry(e.target.value || null)}
            >
              <option value="">ALL BIOMES</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-auto">
            <span className="text-sm font-bold text-app-text-muted uppercase tracking-[0.2em]">Tag Module Cluster</span>
            <div className="flex flex-wrap gap-2 bg-app-bg/40 border-4 border-app-border p-3 max-h-32 overflow-y-auto min-w-[300px]">
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
              {activeTags.length === 0 && (
                <div className="text-[10px] font-mono text-app-text-muted/50 uppercase tracking-widest italic py-1">No tags active. Global scan enabled.</div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-app-text-muted uppercase tracking-[0.2em]">Tier</span>
            <div className="flex bg-app-bg/40 border-4 border-app-border p-1">
              <button 
                onClick={() => setActiveStyle(null)}
                className={`px-6 py-2 text-sm font-bold tracking-widest transition-all ${!activeStyle ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
              >
                ALL
              </button>
              {styles.map(s => (
                <button 
                  key={s}
                  onClick={() => setActiveStyle(s as any)}
                  className={`px-6 py-2 text-sm font-bold tracking-widest transition-all ${activeStyle === s ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-app-text-muted uppercase tracking-[0.2em]">Class</span>
            <div className="flex bg-app-bg/40 border-4 border-app-border p-1">
              <button 
                onClick={() => setActiveCategory(null)}
                className={`px-6 py-2 text-sm font-bold tracking-widest transition-all ${!activeCategory ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
              >
                ALL
              </button>
              {categories.map(c => (
                <button 
                  key={c}
                  onClick={() => setActiveCategory(c as any)}
                  className={`px-6 py-2 text-sm font-bold tracking-widest transition-all ${activeCategory === c ? 'bg-game-accent text-app-bg' : 'text-app-text-muted hover:text-app-text-main'}`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-auto pb-1">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-bold uppercase tracking-widest border-4 transition-all ${showFavoritesOnly ? 'bg-game-magenta border-game-magenta text-white' : 'bg-app-surface border-app-border text-app-text-muted hover:text-app-text-main'}`}
            >
              <Heart size={18} fill={showFavoritesOnly ? "currentColor" : "none"} />
              Loot Table
            </button>
          </div>
          
          {(activeCountry || activeStyle || activeCategory || activeTags.length > 0 || searchQuery || excludeQuery || showFavoritesOnly) && (
            <button 
              onClick={() => { setActiveCountry(null); setActiveStyle(null); setActiveCategory(null); setActiveTags([]); setSearchQuery(''); setExcludeQuery(''); setShowFavoritesOnly(false); }}
              className="ml-auto text-sm font-bold uppercase tracking-[0.2em] text-game-magenta hover:bg-game-magenta/10 px-6 py-3 border-4 border-game-magenta transition-all"
            >
              Reset Matrix
            </button>
          )}
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <div className="text-center p-20 bg-app-surface/20 border border-dashed border-app-border font-mono text-app-text-muted uppercase tracking-[0.3em]">
          Zero records found in selected sector.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>
  );
}

function Scanner() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(''); // Clear previous results
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
      setResult(res);
    } catch (e) {
      setResult("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4 border-l-4 border-game-accent pl-6 bg-app-surface/30 py-4">
        <h2 className="text-4xl font-bold tracking-tighter text-app-text-main uppercase">Visual Analyzer</h2>
        <p className="text-app-text-muted leading-relaxed font-medium">Upload raw visual data for neural breakdown. Our AI will decrypt the molecular structure, scientific classification, and nutritional potential of the target object.</p>
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

      {result && !loading && (
        <div className="game-card p-6 md:p-10 animate-in slide-in-from-bottom-4">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-app-text-main uppercase tracking-widest border-b border-app-border pb-4">
             <Info size={22} className="text-game-accent" /> Intelligence Report
          </h3>
          <div className="markdown-body font-medium leading-relaxed bg-app-bg/20 p-6 border border-app-border">
            <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}

function Generator() {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleIngredients = ['Chicken', 'Rice', 'Garlic', 'Tofu', 'Spinach', 'Corn', 'Egg', 'Chili'];

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
      setResult(res);
    } catch (e) {
      setResult("Error generating recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4 border-l-4 border-game-accent pl-6 bg-app-surface/30 py-4">
        <h2 className="text-4xl font-bold tracking-tighter text-app-text-main uppercase">Crafting Forge</h2>
        <p className="text-app-text-muted leading-relaxed font-medium">Synthesize new items using available raw components. Optimize the output vectors by providing secondary preference metrics.</p>
      </div>

      <div className="game-card p-6 md:p-10 space-y-8">
                <div className="space-y-8 text-left">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <label className="text-base font-bold text-game-accent uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-3 h-3 bg-game-accent"></span>
                Raw Materials Inventory
              </label>
              <div className="flex flex-wrap gap-3">
                {sampleIngredients.map(item => (
                  <button 
                    key={item}
                    onClick={() => handleSampleClick(item)}
                    className="text-sm font-bold uppercase tracking-wider px-3 py-2 bg-game-accent/10 border-2 border-game-accent/40 text-game-accent hover:bg-game-accent hover:text-app-bg transition-all"
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

      {result && !loading && (
        <div className="game-card p-6 md:p-10 animate-in slide-in-from-bottom-4">
          <h3 className="text-xl font-bold mb-8 text-app-text-main uppercase tracking-widest border-b border-app-border pb-4">Synthesis Result</h3>
          <div className="markdown-body font-medium leading-relaxed bg-app-bg/20 p-6 border border-app-border">
            <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}

function RecipeModal({ dish, onClose, vitals, onVitalsUpdate }: { dish: Dish, onClose: () => void, vitals: any, onVitalsUpdate: (v: any) => void }) {
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceData, setPriceData] = useState<string | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthData, setHealthData] = useState<string | null>(null);

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisMessage, setSynthesisMessage] = useState<{ text: string, type: 'plus' | 'minus' | 'buff' } | null>(null);

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    
    // Synthesis Logic
    const newVitals = { ...vitals };
    let message = "";
    let type: 'plus' | 'minus' | 'buff' = 'plus';

    const calories = parseInt(dish.nutrition.calories) || 0;
    const fat = parseInt(dish.nutrition.fat) || 0;
    const protein = parseInt(dish.nutrition.protein) || 0;

    const isHealthy = calories < 550 && fat < 25;
    const isJunk = calories > 900 || fat > 45;
    const isProtein = protein > 35;
    const isBeverage = dish.category === 'Beverage';

    if (isHealthy) {
      newVitals.health = Math.min(100, vitals.health + 10);
      newVitals.shield = Math.min(100, vitals.shield + 5);
      message = "VITALITY RESTORED: +10 HP, +5 SHD";
      type = 'plus';
    } else if (isJunk) {
      newVitals.health = Math.max(1, vitals.health - 15);
      message = "TOXICITY DETECTED: -15 HP (LIPID OVERLOAD)";
      type = 'minus';
    } else {
      newVitals.health = Math.min(100, vitals.health + 5);
      message = "NUTRIENTIAL GAIN: +5 HP";
      type = 'plus';
    }

    if (isProtein) {
      newVitals.attack = Math.min(99, vitals.attack + 2);
      message += " | ATK BOOSTED!";
      type = 'buff';
    }

    if (isBeverage) {
      newVitals.shield = Math.min(100, vitals.shield + 15);
      message += " | SHIELD RECHARGED!";
      type = 'buff';
    }

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
      const ingredientNames = (dish.ingredients || []).map(ing => ing.name);
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
      const ingredientNames = (dish.ingredients || []).map(ing => ing.name);
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
        className="modal-content !max-w-6xl"
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

          <div className="absolute bottom-0 left-0 p-8 text-app-text-main w-full">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" role="img" aria-label="dish-emoji">{dish.emoji}</span>
              <div className="flex gap-2 font-game">
                <span className="px-4 py-2 bg-game-magenta border-2 border-black text-xs font-bold uppercase tracking-[0.2em]">{dish.country}</span>
                <span className="px-4 py-2 bg-game-accent border-2 border-black text-xs font-bold uppercase tracking-[0.2em]">{dish.style}</span>
              </div>
            </div>
            <h2 id="modal-title" className="font-game text-5xl md:text-6xl font-black tracking-tight uppercase mb-3 text-app-text-main">
              {dish.name.replace(/\s*\(.*?\)\s*/g, '')}
            </h2>
            <p className="text-white max-w-2xl text-xl font-medium leading-tight bg-black/60 p-5 border-l-[8px] border-game-accent">
              {dish.desc}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 bg-app-bg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content Area: Ingredients & Recipe */}
            <div className="lg:col-span-9 order-2 lg:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Ingredients Column */}
                <div className="p-8 bg-app-surface border-4 border-app-border flex flex-col gap-6 relative">
                  <div className="absolute top-0 right-0 p-2 text-sm font-mono text-game-accent uppercase tracking-widest">Material Deck</div>
                  <div>
                    <h3 className="text-xl font-black border-b-4 border-app-border pb-4 mb-6 flex items-center gap-3 text-app-text-main uppercase tracking-widest">
                      <span className="w-3 h-3 bg-game-accent"></span>
                      Resource Components
                    </h3>
                    <ul className="space-y-4">
                      {(dish.ingredients || []).map((ing, idx) => (
                        <li key={idx} className="flex flex-col bg-black/40 p-4 border-l-4 border-app-border hover:border-game-accent transition-colors">
                          <span className="text-lg font-bold text-app-text-main uppercase tracking-wide leading-tight">
                            {ing.quantity} {ing.unit} {ing.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {dish.variations && dish.variations.length > 0 && (
                    <div className="pt-6 border-t-4 border-app-border">
                      <h3 className="text-base font-bold uppercase tracking-[0.3em] text-game-accent border-b-4 border-app-border pb-4 mb-6 flex items-center gap-3">
                        <span className="w-3 h-3 bg-game-accent"></span>
                        Sub-Modules
                      </h3>
                      <ul className="space-y-3">
                        {dish.variations.map((v, idx) => (
                          <li key={idx} className="text-base text-app-text-muted flex items-start gap-2 before:content-['•'] before:text-game-accent">
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Recipe Column */}
                <div className="p-8 bg-app-surface border-4 border-app-border relative">
                  <div className="absolute top-0 right-0 p-2 text-sm font-mono text-game-accent opacity-50 uppercase tracking-widest">Blueprint: {dish.country}</div>
                  <h3 className="text-xl font-black border-b-4 border-app-border pb-4 mb-6 flex items-center gap-4 text-app-text-main uppercase tracking-widest">
                    <Pickaxe className="text-game-accent" size={24} /> Crafting Steps
                  </h3>
                  <div className="markdown-body text-app-text-main text-lg leading-snug">
                    <Markdown remarkPlugins={[remarkGfm]}>{dish.recipe}</Markdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Intelligence & Systems */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-10">
              
              <div className="p-8 bg-app-surface border-4 border-app-border flex flex-col gap-6 relative">
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
                    <div className="mt-6 p-6 bg-app-bg/40 border-4 border-app-border text-base font-medium markdown-body">
                      <Markdown remarkPlugins={[remarkGfm]}>{priceData}</Markdown>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 bg-app-surface border-4 border-app-border space-y-8 relative">
                <div className="absolute top-0 right-0 p-2 text-sm font-mono text-game-magenta uppercase tracking-widest">System Health</div>
                <h3 className="text-base font-bold uppercase tracking-[0.3em] text-game-magenta flex items-center gap-4 border-b-4 border-app-border pb-4">
                  <HeartPulse className="text-game-magenta" size={24} /> OS Vitals
                </h3>
                
                <div className="space-y-8 text-lg">
                  <div>
                    <h4 className="text-sm font-bold text-app-text-muted uppercase tracking-[0.2em] mb-4">Core Attributes</h4>
                    <div className="grid grid-cols-2 gap-4 font-mono">
                      <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                        <span className="text-sm uppercase text-app-text-main mb-1 font-black">Energy</span>
                        <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.calories}</span>
                      </div>
                      <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                        <span className="text-sm uppercase text-app-text-main mb-1 font-black">Power</span>
                        <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.protein}</span>
                      </div>
                      <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                        <span className="text-sm uppercase text-app-text-main mb-1 font-black">Fuel</span>
                        <span className="font-bold text-app-text-main text-2xl">{dish.nutrition.carbohydrates}</span>
                      </div>
                      <div className="bg-app-bg/40 p-4 border-4 border-app-border flex flex-col items-center">
                        <span className="text-sm uppercase text-app-text-main mb-1 font-black">Buffer</span>
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
                  <p className="text-sm text-app-text-muted mb-6 leading-relaxed">Execute the synthesis algorithm to incorporate this blueprint into your bio-matrix.</p>
                  
                  <div className="relative">
                    <button 
                      onClick={handleSynthesize}
                      disabled={isSynthesizing}
                      className={`game-btn w-full py-6 text-2xl uppercase tracking-[0.3em] font-black transition-all ${isSynthesizing ? 'bg-app-border text-app-text-muted' : 'game-btn-primary border-4 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:scale-[1.02]'}`}
                    >
                      {isSynthesizing ? 'Processing...' : 'Synthesize Item'}
                    </button>
                    
                    <AnimatePresence>
                      {synthesisMessage && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`absolute -top-16 left-0 right-0 p-3 text-center text-sm font-black uppercase tracking-widest border-2 ${synthesisMessage.type === 'plus' ? 'bg-game-green/20 border-game-green text-game-green' : synthesisMessage.type === 'minus' ? 'bg-game-magenta/20 border-game-magenta text-game-magenta' : 'bg-game-accent/20 border-game-accent text-game-accent'}`}
                        >
                          {synthesisMessage.text}
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
