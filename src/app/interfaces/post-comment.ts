import { Subscription } from 'rxjs';

export interface PostComment {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  success: boolean;
  body: {
    blogId: string | null;
    body: string | null;
    user?: any;
  };
}
