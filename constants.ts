
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
  }
];

export const TEHRAN_CENTER = { lat: 35.6892, lng: 51.3890 };
