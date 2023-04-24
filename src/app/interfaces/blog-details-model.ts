import { Subscription } from 'rxjs';

export interface BlogDetailsModel {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  blogId: string | null;
  data: any;
}
