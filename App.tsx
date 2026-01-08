import React, { useState, useCallback, useMemo } from 'react';
import { Event, EventStatus } from './types';
import { INITIAL_EVENTS } from './constants';
import EventCard from './components/EventCard';
import MapWrapper from './components/MapWrapper';
import { getEventSuggestions } from './services/geminiService';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  MapPin,
  Sparkles,
  Menu,
  X,
  Music,
  Cpu,
  Palette,
  UtensilsCrossed,
  Trophy,
  Globe,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'همه', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'music', label: 'موسیقی', icon: <Music className="w-3.5 h-3.5" /> },
    { id: 'tech', label: 'تکنولوژی', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'art', label: 'هنر', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'food', label: 'غذا', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: 'sport', label: 'ورزش', icon: <Trophy className="w-3.5 h-3.5" /> },
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
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans relative" dir="rtl">
      {/* Sidebar Toggle for Mobile */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50 rounded-full shadow-2xl font-bold px-6 py-6 h-auto"
        size="lg"
      >
        <span className="flex items-center gap-2">
          {isSidebarOpen ? 'مشاهده نقشه' : 'لیست رویدادها'}
          <Menu className="h-5 w-5" />
        </span>
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 right-0 md:relative w-full md:w-[400px] h-full flex flex-col bg-card border-l shadow-xl z-40 transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <header className="p-6 border-b space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">تهران هاب</h1>
                <p className="text-[10px] text-muted-foreground font-medium italic">نبض رویدادهای شهر</p>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="text"
              placeholder="جستجوی رویداد، هنر، تکنولوژی..."
              className="pr-10 pl-12 py-6 bg-muted/50 border-none focus-visible:ring-primary rounded-xl text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAiAsk}
                disabled={isAiLoading}
                className="h-8 w-8 text-primary hover:bg-primary/10"
                title="بپرس از هوش مصنوعی"
              >
                {isAiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Filters Wrapper */}
          <div className="space-y-4">
            {/* Category Chips */}
            <ScrollArea className="w-full whitespace-nowrap pb-2" dir="rtl">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "rounded-full h-8 px-4 text-xs font-bold gap-2",
                      selectedCategory !== cat.id && "border-muted"
                    )}
                  >
                    {cat.icon}
                    {cat.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            {/* Status Tabs */}
            <Tabs
              value={selectedStatus}
              onValueChange={(v) => setSelectedStatus(v as StatusFilter)}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1">
                {statuses.map((stat) => (
                  <TabsTrigger
                    key={stat.id}
                    value={stat.id}
                    className="text-[10px] font-bold h-7 data-[state=active]:shadow-sm"
                  >
                    {stat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </header>

        {/* AI Suggestion Area */}
        {aiSuggestion && (
          <div className="mx-6 mt-4 p-5 bg-primary text-primary-foreground rounded-2xl shadow-lg relative animate-in fade-in slide-in-from-top-4 duration-500">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAiSuggestion(null)}
              className="absolute top-2 left-2 h-6 w-6 text-primary-foreground/50 hover:text-primary-foreground hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80 underline decoration-white/30 underline-offset-4">هوش مصنوعی</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">{aiSuggestion}</p>
          </div>
        )}

        {/* Scrollable Event List */}
        <ScrollArea className="flex-grow p-6" dir="rtl">
          <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-2 z-10 mb-4 px-1">
            <h2 className="font-bold text-sm">
              {selectedStatus === 'all'
                ? (selectedCategory === 'all' ? 'همه رویدادها' : `رویدادهای ${categories.find(c => c.id === selectedCategory)?.label}`)
                : `رویدادهای ${statuses.find(s => s.id === selectedStatus)?.label}`
              }
            </h2>
            <Badge variant="secondary" className="font-black text-[10px] bg-primary/10 text-primary border-none">
              {filteredEvents.length} رویداد
            </Badge>
          </div>

          <div className="space-y-4 pb-20 md:pb-6">
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
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
                <MapPin className="h-12 w-12 opacity-10" />
                <p className="text-sm font-medium">رویدادی پیدا نشد!</p>
                {(selectedCategory !== 'all' || selectedStatus !== 'all') && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                    }}
                    className="text-primary text-xs font-bold"
                  >
                    پاک کردن همه فیلترها
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Info */}
        <footer className="p-4 border-t bg-muted/30">
          <div className="flex justify-between items-center text-[10px] text-muted-foreground font-black uppercase tracking-wider">
            <span>نسخه آزمایشی ۱.۰</span>
            <span>طراحی شده برای تهران</span>
          </div>
        </footer>
      </aside>

      {/* Map Main View */}
      <main className="flex-grow relative h-full bg-muted">
        <MapWrapper
          events={filteredEvents}
          selectedEventId={selectedEventId}
          checkedInIds={checkedInIds}
          onEventSelect={handleEventSelect}
        />

        {/* Map Legend (Desktop Only) */}
        <div className="absolute top-6 left-6 z-10 hidden lg:block">
          <div className="bg-background/95 backdrop-blur px-5 py-4 rounded-2xl shadow-2xl border space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-destructive ring-4 ring-destructive/10"></div>
              <span className="text-[11px] font-bold text-muted-foreground">انتخاب شده</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              <span className="text-[11px] font-bold text-muted-foreground">شرکت کرده‌اید</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
              <span className="text-[11px] font-bold text-muted-foreground">رویداد فعال</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
