import { Subscription } from 'rxjs';

export interface PostReact {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  body: {
    blogId: string | null;
    reactName: string;
  };
}
