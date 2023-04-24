import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarEmmiterService } from 'src/app/services/navbar-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  page: any;
  user: User = {
    first_name: '',
    id: '',
    role: '',
  };

  constructor(
    private _utils: UtilsService,
    private _authService: AuthService,
    private _router: Router,
    private _navbar: NavbarEmmiterService
  ) {}

  ngOnInit(): void {
    this.page = this._utils.page;
    this._navbar.output.subscribe((res: any) => {
      this.user = res;
    });
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
