import React, { useState } from 'react';
import { ChefHat, Camera, ScrollText, HeartPulse, Search, Info, Menu, X, XCircle, Heart } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { analyzeFoodImage, generateRecipeFromIngredients, getIngredientPrices, getHealthInsights } from './services/geminiService';
import { DISHES, Dish } from './data/dishes';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'generator'>('dashboard');
  
  // Filtering state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<'Traditional' | 'Modern' | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Food' | 'Beverage' | null>(null);

  // Modal State
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const countries = Array.from(new Set(DISHES.map(d => d.country)));

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fafafa] relative">
      {/* Top Navigation */}
      <header className="min-nav py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#eaeaea] transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden md:flex p-2 rounded-md hover:bg-[#eaeaea] transition-colors text-[#666666]"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <ChefHat className="text-[#111111] w-6 h-6 hidden sm:block" />
            <h1 className="text-xl font-bold tracking-tight text-[#111111]">
              Flavor Heritage
            </h1>
          </div>
        </div>
        <nav className="hidden md:flex gap-2">
          <TabButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<Info size={16} />}
            label="Dishes"
          />
          <TabButton 
            active={activeTab === 'scanner'} 
            onClick={() => setActiveTab('scanner')}
            icon={<Camera size={16} />}
            label="Scanner"
          />
          <TabButton 
            active={activeTab === 'generator'} 
            onClick={() => setActiveTab('generator')}
            icon={<ScrollText size={16} />}
            label="Generator"
          />
        </nav>
      </header>

      {/* Hamburger / Navigation Sidebar */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-[65px] md:top-[73px] left-0 bottom-0 w-64 bg-white z-30 shadow-[4px_0_24px_rgba(0,0,0,0.05)] p-6 overflow-y-auto border-r border-[#eaeaea] animate-in slide-in-from-left duration-300">
            <h2 className="text-lg font-semibold tracking-tight text-[#111111] mb-6">Categories</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">By Country</h3>
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => { setActiveCountry(null); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeCountry === null ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      All Countries
                    </button>
                  </li>
                  {countries.map(c => (
                    <li key={c}>
                      <button 
                        onClick={() => { setActiveCountry(c); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeCountry === c ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">By Category</h3>
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => { setActiveCategory(null); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeCategory === null ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      All Categories
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveCategory('Food'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeCategory === 'Food' ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      Food
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveCategory('Beverage'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeCategory === 'Beverage' ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      Beverages
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">By Style</h3>
                <ul className="space-y-1">
                  <li>
                    <button 
                      onClick={() => { setActiveStyle(null); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeStyle === null ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      All Styles
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveStyle('Traditional'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeStyle === 'Traditional' ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      Traditional
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveStyle('Modern'); setIsMenuOpen(false); setActiveTab('dashboard'); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${activeStyle === 'Modern' ? 'bg-[#111111] text-white font-medium' : 'hover:bg-[#fafafa] text-[#666666]'}`}
                    >
                      Modern
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
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

      {selectedDish && (
        <RecipeModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`min-btn gap-2 ${active ? 'min-btn-primary' : 'min-btn-ghost'} rounded-lg transition-all`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg ${active ? 'text-[#111111] font-medium' : 'text-[#666666]'}`}
    >
      {icon}
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </button>
  );
}

function DishCard({ dish, isFavorite, onToggleFavorite, onClick }: { dish: Dish; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void; onClick: () => void }) {
  const [showHealth, setShowHealth] = React.useState(false);

  return (
    <div 
      className="min-card group cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image Container with Hover Overlay for Scientific Names */}
      <div className="relative h-56 w-full overflow-hidden bg-[#fafafa]">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-[#111111]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
          <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-widest">Ingredient List</h4>
          <ul className="space-y-2 w-full text-center">
            {dish.scientificNames.map((sn, idx) => (
              <li key={idx} className="text-sm">
                <span className="text-white/80">{sn.ingredient}</span>
                <div className="text-white font-mono text-xs opacity-70 italic mt-0.5">{sn.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col relative bg-white">
        <div className="absolute -top-6 right-5 bg-white w-12 h-12 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-2xl border border-[#eaeaea]">
          {dish.emoji}
        </div>

        <div className="mt-2 space-y-1">
          <h3 className="font-semibold text-lg text-[#111111] truncate pr-14">{dish.name}</h3>
          <div className="text-xs text-[#666666] flex items-center gap-2">
            <span>{dish.country}</span>
            <span className="w-1 h-1 rounded-full bg-[#cccccc]"></span>
            <span>{dish.style} {dish.category}</span>
          </div>
        </div>
        
        <p className="text-sm text-[#666666] mt-4 line-clamp-2 leading-relaxed flex-1">
          {dish.desc}
        </p>

        <div className="mt-4 pt-4 border-t border-[#eaeaea] flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:text-blue-600 transition-colors">View Recipe &rarr;</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={onToggleFavorite}
                className={`p-1.5 rounded-full transition-colors ${isFavorite ? 'text-red-500 hover:text-red-600 bg-red-50' : 'text-[#999999] hover:text-[#666666] bg-[#fafafa] hover:bg-[#eaeaea]'}`}
                title="Toggle Favorite"
              >
                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowHealth(!showHealth); }}
                className="text-xs flex items-center gap-1 font-medium text-red-600 hover:text-red-700 px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
              >
                <HeartPulse size={14} /> Health
              </button>
            </div>
        </div>

        {showHealth && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-[#333] space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="block font-semibold text-blue-700 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">Nutrition</span>
              <div className="grid grid-cols-4 gap-2 text-xs opacity-80 leading-relaxed mt-2 text-center">
                <div className="bg-blue-100/50 p-2 rounded">
                  <span className="block font-bold">Cal</span>
                  <span>{dish.nutrition.calories}</span>
                </div>
                <div className="bg-blue-100/50 p-2 rounded">
                  <span className="block font-bold">Prot</span>
                  <span>{dish.nutrition.protein}</span>
                </div>
                <div className="bg-blue-100/50 p-2 rounded">
                  <span className="block font-bold">Carb</span>
                  <span>{dish.nutrition.carbohydrates}</span>
                </div>
                <div className="bg-blue-100/50 p-2 rounded">
                  <span className="block font-bold">Fat</span>
                  <span>{dish.nutrition.fat}</span>
                </div>
              </div>
            </div>
            <div>
              <span className="block font-semibold text-green-700 text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><HeartPulse size={12}/> Benefits</span>
              <p className="text-xs opacity-80 leading-relaxed">{dish.healthBenefits}</p>
            </div>
            {dish.excessRisks && (
              <div>
                <span className="block font-semibold text-red-700 text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><XCircle size={12}/> Excess Risks</span>
                <p className="text-xs opacity-80 leading-relaxed">{dish.excessRisks}</p>
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
  onSelectDish 
}: { 
  activeCountry: string | null, 
  activeStyle: string | null, 
  activeCategory: string | null, 
  setActiveCountry: (c: string | null) => void,
  setActiveStyle: (s: 'Traditional' | 'Modern' | null) => void,
  setActiveCategory: (c: 'Food' | 'Beverage' | null) => void,
  onSelectDish: (d: Dish) => void 
}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [excludeQuery, setExcludeQuery] = React.useState('');
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
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
    if (activeTag && (!d.tags || !d.tags.includes(activeTag))) return false;
    
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
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-[#111111]">Explore Global Flavors</h2>
        <p className="text-[#666666] leading-relaxed">
          Discover curated recipes focusing on health and heritage. View detailed nutritional profiles and prepare dishes with intelligence.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" size={20} />
            <input 
              type="text" 
              placeholder="Search recipes, ingredients, country, or style..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#eaeaea] bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative flex-1">
            <XCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" size={20} />
            <input 
              type="text" 
              placeholder="Exclude ingredients (e.g. peanut, pork)..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-red-100 bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all placeholder:text-red-300"
              value={excludeQuery}
              onChange={(e) => setExcludeQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-[#eaeaea] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#666666]">Country:</span>
          <select 
            className="text-sm border border-[#eaeaea] bg-[#fafafa] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#111111]"
            value={activeCountry || ''}
            onChange={(e) => setActiveCountry(e.target.value || null)}
          >
            <option value="">All</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#666666]">Tag:</span>
          <select 
            className="text-sm border border-[#eaeaea] bg-[#fafafa] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#111111]"
            value={activeTag || ''}
            onChange={(e) => setActiveTag(e.target.value || null)}
          >
            <option value="">All</option>
            {allTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#666666]">Style:</span>
          <div className="flex bg-[#fafafa] border border-[#eaeaea] rounded-lg p-1">
            <button 
              onClick={() => setActiveStyle(null)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${!activeStyle ? 'bg-white shadow border border-[#eaeaea] text-[#111111]' : 'text-[#666666] hover:bg-[#eaeaea]'}`}
            >
              All
            </button>
            {styles.map(s => (
              <button 
                key={s}
                onClick={() => setActiveStyle(s as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeStyle === s ? 'bg-white shadow border border-[#eaeaea] text-[#111111]' : 'text-[#666666] hover:bg-[#eaeaea]'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#666666]">Category:</span>
          <div className="flex bg-[#fafafa] border border-[#eaeaea] rounded-lg p-1">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${!activeCategory ? 'bg-white shadow border border-[#eaeaea] text-[#111111]' : 'text-[#666666] hover:bg-[#eaeaea]'}`}
            >
              All
            </button>
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setActiveCategory(c as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${activeCategory === c ? 'bg-white shadow border border-[#eaeaea] text-[#111111]' : 'text-[#666666] hover:bg-[#eaeaea]'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${showFavoritesOnly ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#fafafa] text-[#666666] border-[#eaeaea]'}`}
          >
            <Heart size={16} fill={showFavoritesOnly ? "currentColor" : "none"} />
            Favorites
          </button>
        </div>
        
        {(activeCountry || activeStyle || activeCategory || activeTag || searchQuery || excludeQuery || showFavoritesOnly) && (
          <button 
            onClick={() => { setActiveCountry(null); setActiveStyle(null); setActiveCategory(null); setActiveTag(null); setSearchQuery(''); setExcludeQuery(''); setShowFavoritesOnly(false); }}
            className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
      </div>

      {filteredDishes.length === 0 ? (
        <div className="text-center p-12 text-[#666666]">
          No dishes found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#111111]">Ingredient Scanner</h2>
        <p className="text-[#666666] leading-relaxed">Upload a photo to receive a complete breakdown of ingredients, scientific terms, and nutritional analysis.</p>
      </div>

      <div className="min-card p-6 md:p-8">
        <div 
          className={`min-h-[300px] rounded-xl flex flex-col items-center justify-center relative border border-dashed transition-colors ${
            isDragging 
              ? 'border-[#111111] bg-[#f0f0f0]' 
              : 'border-[#cccccc] bg-[#fafafa] hover:bg-[#f5f5f5]'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
           {image ? (
            <div className="space-y-6 flex flex-col items-center w-full p-6">
              <img src={image} className="max-h-64 object-contain rounded-lg shadow-sm border border-[#eaeaea]" alt="Uploaded food" />
              <div className="flex gap-3">
                <button 
                  onClick={() => setImage(null)} 
                  className="min-btn min-btn-outline"
                >
                  Clear
                </button>
                <button 
                  onClick={handleAnalyze} 
                  disabled={loading}
                  className="min-btn min-btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : <><Search size={16} /> Scan Ingredients</>}
                </button>
              </div>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-4 text-[#666666] hover:text-[#111111] transition-colors p-12 text-center w-full h-full">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-[#eaeaea] flex items-center justify-center">
                <Camera size={24} className="text-[#111111]" />
              </div>
              <div>
                <span className="font-medium block text-[#111111]">Click to upload</span>
                <span className="text-sm">or drag and drop an image</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>
      </div>

      {loading && (
         <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-6 h-6 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#666666] text-sm animate-pulse">Processing image data...</p>
         </div>
      )}

      {result && !loading && (
        <div className="min-card p-6 md:p-8 animate-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
             <Info size={20} className="text-[#666666]" /> Analysis Report
          </h3>
          <div className="markdown-body overflow-x-auto">
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
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#111111]">Recipe Generator</h2>
        <p className="text-[#666666] leading-relaxed">Turn available ingredients into healthy, personalized meals.</p>
      </div>

      <div className="min-card p-6 md:p-8 space-y-8">
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111111]">Available Ingredients</label>
            <textarea 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., chicken breast, garlic, rice, spinach..."
              className="w-full h-32 p-4 rounded-xl border border-[#eaeaea] bg-[#fafafa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent resize-none text-sm transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111111] flex items-center gap-2">
              <HeartPulse size={16} className="text-[#666666]" /> Health Preferences
            </label>
            <input 
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              type="text" 
              placeholder="e.g., low sodium, high protein, diabetic friendly..."
              className="w-full p-4 rounded-xl border border-[#eaeaea] bg-[#fafafa] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent text-sm transition-all"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !ingredients}
            className="min-btn min-btn-primary w-full py-3 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Generate AI Recipe'}
          </button>
        </div>

      </div>

      {loading && (
         <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-6 h-6 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#666666] text-sm animate-pulse">Compiling recipe...</p>
         </div>
      )}

      {result && !loading && (
        <div className="min-card p-6 md:p-8 animate-in slide-in-from-bottom-4">
          <h3 className="text-xl font-semibold mb-6">Generated Recipe</h3>
          <div className="markdown-body overflow-x-auto">
            <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}

function RecipeModal({ dish, onClose }: { dish: Dish, onClose: () => void }) {
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceData, setPriceData] = useState<string | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthData, setHealthData] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for transition out
  };

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
    <div 
      className={`modal-backdrop transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in'}`} 
      onClick={handleClose}
    >
      <div 
        className={`modal-content transition-all duration-300 ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-in zoom-in-95'}`} 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header Image Area */}
        <div className="relative h-64 md:h-80 w-full">
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{dish.emoji}</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-[10px] font-medium uppercase tracking-wider">{dish.country}</span>
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-[10px] font-medium uppercase tracking-wider">{dish.style}</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{dish.name}</h2>
            <p className="text-white/80 max-w-2xl text-sm leading-relaxed">{dish.desc}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Recipe Guide */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="p-6 md:p-8 bg-white border border-[#eaeaea] rounded-xl h-full">
                <h3 className="text-lg font-semibold border-b border-[#eaeaea] pb-4 mb-6 flex items-center gap-2">
                  <ChefHat className="text-[#111111]" size={20} /> Recipe Guide
                </h3>
                <div className="markdown-body overflow-x-auto">
                  <Markdown remarkPlugins={[remarkGfm]}>{dish.recipe}</Markdown>
                </div>
              </div>
            </div>

            {/* Right Column: Health & Science */}
            <div className="lg:col-span-4 order-1 lg:order-2 space-y-6">
              
              <div className="p-5 bg-white border border-[#eaeaea] rounded-xl flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111111] border-b border-[#eaeaea] pb-3 mb-4">
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {(dish.ingredients || []).map((ing, idx) => (
                       <li key={idx} className="flex flex-col">
                        <span className="text-sm font-medium text-[#111111]">
                          {ing.quantity} {ing.unit} {ing.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {dish.variations && dish.variations.length > 0 && (
                  <div className="pt-4 border-t border-[#eaeaea]">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111111] border-b border-[#eaeaea] pb-3 mb-4">
                      Variations
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {dish.variations.map((v, idx) => (
                        <li key={idx} className="text-sm text-[#666666]">
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-[#eaeaea]">
                  <h3 className="text-sm font-semibold text-[#111111] mb-2">Market Price Checker</h3>
                  <p className="text-xs text-[#666666] mb-3">Find estimated online market prices for these ingredients.</p>
                  
                  {!priceData && (
                    <button 
                      onClick={handleCheckPrice}
                      disabled={priceLoading}
                      className="w-full py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-[#333333] transition-colors disabled:opacity-50"
                    >
                      {priceLoading ? 'Searching...' : 'Check Ingredient Prices'}
                    </button>
                  )}

                  {priceLoading && !priceData && (
                    <div className="flex justify-center mt-4">
                      <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {priceData && (
                    <div className="mt-4 p-4 bg-[#fafafa] rounded-lg border border-[#eaeaea] text-sm markdown-body overflow-x-auto">
                      <Markdown remarkPlugins={[remarkGfm]}>{priceData}</Markdown>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 bg-[#fafafa] border border-[#eaeaea] rounded-xl space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111111] flex items-center gap-2 border-b border-[#eaeaea] pb-3">
                  <HeartPulse className="text-[#666666]" size={16} /> Health Impact
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-[#111111] mb-2">Nutrition</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#fafafa] p-3 rounded-lg border border-[#eaeaea] text-center">
                        <span className="block text-xs uppercase tracking-wider text-[#666666] mb-1">Calories</span>
                        <span className="font-semibold text-[#111111]">{dish.nutrition.calories}</span>
                      </div>
                      <div className="bg-[#fafafa] p-3 rounded-lg border border-[#eaeaea] text-center">
                        <span className="block text-xs uppercase tracking-wider text-[#666666] mb-1">Protein</span>
                        <span className="font-semibold text-[#111111]">{dish.nutrition.protein}</span>
                      </div>
                      <div className="bg-[#fafafa] p-3 rounded-lg border border-[#eaeaea] text-center">
                        <span className="block text-xs uppercase tracking-wider text-[#666666] mb-1">Carbs</span>
                        <span className="font-semibold text-[#111111]">{dish.nutrition.carbohydrates}</span>
                      </div>
                      <div className="bg-[#fafafa] p-3 rounded-lg border border-[#eaeaea] text-center">
                        <span className="block text-xs uppercase tracking-wider text-[#666666] mb-1">Fat</span>
                        <span className="font-semibold text-[#111111]">{dish.nutrition.fat}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">Benefits</h4>
                    <p className="text-[#666666] leading-relaxed">{dish.healthBenefits}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#111111] mb-1">Excessive Risks</h4>
                    <p className="text-[#666666] leading-relaxed">{dish.excessRisks}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#eaeaea] mt-4">
                  <h3 className="text-sm font-semibold text-[#111111] mb-2 flex items-center gap-2"><HeartPulse size={16} className="text-red-500" /> AI Insights</h3>
                  <p className="text-xs text-[#666666] mb-3">AI-powered analysis of benefits, risks, and chronic illness prevention.</p>
                  
                  {!healthData && (
                    <button 
                      onClick={handleCheckHealth}
                      disabled={healthLoading}
                      className="w-full py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 border border-red-200"
                    >
                      {healthLoading ? 'Analyzing...' : 'Analyze Nutritional Profile'}
                    </button>
                  )}

                  {healthLoading && !healthData && (
                    <div className="flex justify-center mt-4">
                      <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {healthData && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-[#eaeaea] shadow-sm text-sm markdown-body overflow-x-auto">
                      <Markdown remarkPlugins={[remarkGfm]}>{healthData}</Markdown>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
