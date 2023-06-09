import { Subscription } from 'rxjs';

export interface SignupModel {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}
