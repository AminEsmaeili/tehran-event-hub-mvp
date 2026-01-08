
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Event, EventStatus } from './types';
import { INITIAL_EVENTS } from './constants';
import EventCard from './components/EventCard';
import MapWrapper from './components/MapWrapper';
import { getEventSuggestions } from './services/geminiService';

type Category = 'all' | 'music' | 'tech' | 'art' | 'food' | 'sport';
type StatusFilter = 'all' | EventStatus;

const App: React.FC = () => {
  const [events] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [checkedInIds, setCheckedInIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'همه', icon: '🌍' },
    { id: 'music', label: 'موسیقی', icon: '🎵' },
    { id: 'tech', label: 'تکنولوژی', icon: '💻' },
    { id: 'art', label: 'هنر', icon: '🎨' },
    { id: 'food', label: 'غذا', icon: '🍔' },
    { id: 'sport', label: 'ورزش', icon: '⚽' },
  ];

  const statuses: { id: StatusFilter; label: string }[] = [
    { id: 'all', label: 'همه زمان‌ها' },
    { id: 'ongoing', label: 'در حال اجرا' },
    { id: 'upcoming', label: 'آینده' },
    { id: 'past', label: 'گذشته' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || e.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus]);

  const handleCheckIn = useCallback((id: string) => {
    if (!checkedInIds.includes(id)) {
      setCheckedInIds(prev => [...prev, id]);
    }
  }, [checkedInIds]);

  const handleEventSelect = useCallback((id: string) => {
    setSelectedEventId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleAiAsk = async () => {
    if (!searchQuery.trim()) return;
    setIsAiLoading(true);
    const suggestion = await getEventSuggestions(searchQuery);
    setAiSuggestion(suggestion || "متأسفانه چیزی پیدا نشد.");
    setIsAiLoading(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 font-['Vazirmatn'] relative">
      {/* Sidebar Toggle for Mobile */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2"
      >
        {isSidebarOpen ? 'مشاهده نقشه' : 'لیست رویدادها'}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 md:relative w-full md:w-[420px] h-full flex flex-col bg-white border-l shadow-2xl z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        {/* Header */}
        <header className="p-6 border-b bg-white sticky top-0 z-30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">تهران هاب</h1>
                <p className="text-xs text-gray-400 font-medium italic">نبض رویدادهای شهر</p>
              </div>
            </div>
            <div className="md:hidden">
               <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 p-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
            </div>
          </div>

          <div className="relative group">
            <input 
              type="text" 
              placeholder="جستجوی رویداد، هنر، تکنولوژی..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl text-sm transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button 
                onClick={handleAiAsk}
                disabled={isAiLoading}
                className={`p-1.5 rounded-lg transition-colors ${isAiLoading ? 'bg-blue-100' : 'hover:bg-blue-50 text-blue-600'}`}
                title="بپرس از هوش مصنوعی"
              >
                {isAiLoading ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Filters Wrapper */}
          <div className="space-y-3">
            {/* Category Chips */}
            <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border-2 ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Status Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {statuses.map((stat) => (
                <button
                  key={stat.id}
                  onClick={() => setSelectedStatus(stat.id)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    selectedStatus === stat.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {stat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* AI Suggestion Area */}
        {aiSuggestion && (
          <div className="mx-6 mt-4 p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl relative animate-in fade-in slide-in-from-top-4 duration-500">
            <button 
              onClick={() => setAiSuggestion(null)}
              className="absolute top-3 left-3 text-white/40 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 p-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 01-1.414 1.414z" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">هوش مصنوعی</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">{aiSuggestion}</p>
          </div>
        )}

        {/* Scrollable Event List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
          <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md py-2 z-10">
            <h2 className="font-bold text-gray-800">
              {selectedStatus === 'all' 
                ? (selectedCategory === 'all' ? 'همه رویدادها' : `رویدادهای ${categories.find(c => c.id === selectedCategory)?.label}`)
                : `رویدادهای ${statuses.find(s => s.id === selectedStatus)?.label}`
              }
            </h2>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{filteredEvents.length} رویداد</span>
          </div>
          
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard 
                key={event.id}
                event={event}
                isSelected={selectedEventId === event.id}
                isCheckedIn={checkedInIds.includes(event.id)}
                onCheckIn={handleCheckIn}
                onSelect={(e) => handleEventSelect(e.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm font-medium">رویدادی پیدا نشد!</p>
              {(selectedCategory !== 'all' || selectedStatus !== 'all') && (
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                  className="text-blue-600 text-xs font-bold underline"
                >
                  پاک کردن همه فیلترها
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <footer className="p-5 border-t bg-gray-50/50">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span>نسخه آزمایشی ۱.۰</span>
            <span>طراحی شده برای تهران</span>
          </div>
        </footer>
      </aside>

      {/* Map Main View */}
      <main className="flex-grow relative h-full bg-blue-50">
        <MapWrapper 
          events={filteredEvents}
          selectedEventId={selectedEventId}
          checkedInIds={checkedInIds}
          onEventSelect={handleEventSelect}
        />
        
        {/* Map Legend (Desktop Only) */}
        <div className="absolute top-6 left-6 z-10 hidden lg:block">
           <div className="bg-white/90 backdrop-blur px-4 py-3 rounded-2xl shadow-xl border border-white/20 space-y-2">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-[#ef4444] ring-4 ring-red-100"></div>
               <span className="text-xs font-bold text-gray-600">انتخاب شده</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-[#22c55e] ring-4 ring-green-100"></div>
               <span className="text-xs font-bold text-gray-600">شرکت کرده‌اید</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-[#3b82f6] ring-4 ring-blue-100"></div>
               <span className="text-xs font-bold text-gray-600">رویداد فعال</span>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
