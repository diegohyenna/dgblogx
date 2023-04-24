import { Subscription } from 'rxjs';

export interface CategoriesModel {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  items: {
    id: string;
    name: string;
    count: number;
  }[];
  total: number;
  currentCategoryId: string;
}
