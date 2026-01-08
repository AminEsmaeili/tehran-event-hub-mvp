
import { Event } from './types';

export const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'نمایشگاه هنرهای معاصر',
    description: 'نمایشگاه گروهی هنرمندان جوان تهران در گالری هنرمندان.',
    location: { lat: 35.7006, lng: 51.4056 },
    address: 'خیابان کریم‌خان، گالری هنرمندان',
    category: 'art',
    status: 'ongoing',
    startTime: '۱۴۰۲/۰۸/۲۵ - ۱۷:۰۰',
    organizer: 'انجمن هنرهای تجسمی',
    checkInCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'دورهمی برنامه‌نویسان پایتون',
    description: 'گفتگو در مورد هوش مصنوعی و کتابخانه‌های جدید پایتون.',
    location: { lat: 35.7259, lng: 51.3328 },
    address: 'سعادت آباد، فضای کار اشتراکی زاویه',
    category: 'tech',
    status: 'upcoming',
    startTime: '۱۴۰۲/۰۸/۲۶ - ۱۸:۳۰',
    organizer: 'جامعه پایتون تهران',
    checkInCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'کنسرت موسیقی سنتی',
    description: 'اجرای موسیقی سنتی ایرانی توسط گروه صبا در تالار وحدت.',
    location: { lat: 35.6997, lng: 51.4111 },
    address: 'خیابان حافظ، تالار وحدت',
    category: 'music',
    status: 'upcoming',
    startTime: '۱۴۰۲/۰۸/۲۸ - ۲۰:۰۰',
    organizer: 'بنیاد رودکی',
    checkInCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673a?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'جشنواره غذاهای محلی',
    description: 'تجربه طعم‌های متنوع از سراسر ایران در قلب تهران.',
    location: { lat: 35.7551, lng: 51.4124 },
    address: 'ونک، پارک ملت',
    category: 'food',
    status: 'past',
    startTime: '۱۴۰۲/۰۸/۳۰ - ۱۰:۰۰',
    organizer: 'سازمان گردشگری',
    checkInCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'کنفرانس امنیت سایبری',
    description: 'بررسی جدیدترین تهدیدات امنیتی و راه‌های مقابله با آن‌ها.',
    location: { lat: 35.7015, lng: 51.3912 },
    address: 'میدان انقلاب، دانشگاه تهران',
    category: 'tech',
    status: 'ongoing',
    startTime: '۱۴۰۲/۰۹/۰۲ - ۰۹:۰۰',
    organizer: 'مرکز آپا',
    checkInCount: 120,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'کارگاه سفالگری مدرن',
    description: 'آموزش تکنیک‌های نوین در هنر سفالگری و لعاب‌کاری.',
    location: { lat: 35.6842, lng: 51.4390 },
    address: 'خیابان شریعتی، مرکز فرهنگی نیاوران',
    category: 'art',
    status: 'upcoming',
    startTime: '۱۴۰۲/۰۹/۰۵ - ۱۵:۳۰',
    organizer: 'خانه هنرمندان',
    checkInCount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'مسابقات فوتسال خیریه',
    description: 'رقابت تیم‌های محلی برای جمع‌آوری کمک به نفع نیازمندان.',
    location: { lat: 35.7312, lng: 51.3754 },
    address: 'شهرک غرب، سالن ورزشی فدک',
    category: 'sport',
    status: 'ongoing',
    startTime: '۱۴۰۲/۰۹/۰۸ - ۱۸:۰۰',
    organizer: 'خیریه همت',
    checkInCount: 340,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'تور دوچرخه‌سواری تهرانگردی',
    description: 'رکاب‌زنی گروهی از تجریش تا کاخ گلستان.',
    location: { lat: 35.8051, lng: 51.4242 },
    address: 'میدان تجریش (نقطه شروع)',
    category: 'sport',
    status: 'upcoming',
    startTime: '۱۴۰۲/۰۹/۱۰ - ۰۷:۰۰',
    organizer: 'هیئت دوچرخه‌سواری',
    checkInCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a1c4b66d?q=80&w=400&h=300&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'کافه گردی در مرکز شهر',
    description: 'معرفی و تست قهوه‌های تخصصی در کافه‌های قدیمی تهران.',
    location: { lat: 35.6923, lng: 51.4087 },
    address: 'خیابان انقلاب، کافه کتاب',
    category: 'food',
    status: 'ongoing',
    startTime: '۱۴۰۲/۰۹/۱۲ - ۱۶:۰۰',
    organizer: 'انجمن باریستاهای ایران',
    checkInCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400&h=300&auto=format&fit=crop'
  }
];

export const TEHRAN_CENTER = { lat: 35.6892, lng: 51.3890 };
