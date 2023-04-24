import { Subscription } from 'rxjs';

export interface CategoryList {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  items: {
    id: string;
    name: string;
    count?: number;
  }[];
}
