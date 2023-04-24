import { Subscription } from 'rxjs';

export interface LoginModel {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  data: {
    email: string;
    password: string;
  };
}
