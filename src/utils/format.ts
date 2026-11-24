import { format } from 'date-fns';
import { CATEGORIES, type Category } from '../types/post';

// '2026-11-22T06:00:00.000Z' → '2026.11.22'
export function formatDate(isoString: string) {
  return format(new Date(isoString), 'yyyy.MM.dd');
}

// 'Travel' → '여행'
export function getCategoryLabel(category: Category) {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
