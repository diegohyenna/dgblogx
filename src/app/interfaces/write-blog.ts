import { Subscription } from 'rxjs';

export interface WriteBlog {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  data: {
    title: string;
    category: string;
    body: string;
    img: string;
  };
}
