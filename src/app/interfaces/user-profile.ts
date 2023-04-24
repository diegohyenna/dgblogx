import { Subscription } from 'rxjs';

export interface UserProfile {
  sub: Subscription;
  error: string | null;
  loading: boolean;
  data: {
    img?: string;
    id: string;
    email?: string;
    first_name: string;
    last_name?: string;
    role: string;
    joined?: string;
    job?: string;
    address?: string;
    about?: string;
  };
  hasReact?: string | null;
}
