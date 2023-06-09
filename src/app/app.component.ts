import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DGBlogX';
  getUserSub!: Subscription;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.getUserSub = this._authService.fetchUserData().subscribe({
      next: (res: any) => {
        this.getUserSub.unsubscribe();
      },
      error: (err: any) => {
        this.getUserSub.unsubscribe();
      },
    });
  }
}
