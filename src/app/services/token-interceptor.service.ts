import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { NavbarEmmiterService } from './navbar-emitter.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private refreshingInProgress = false;
  private accessTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor(
    private _localStorageService: LocalStorageService,
    private _authService: AuthService,
    private _router: Router,
    private _navbar: NavbarEmmiterService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const accessToken = this._localStorageService.getAccessToken() || '';
    req = this.addAccessTokenHeader(req, accessToken);

    this._authService.getLoggedInUserData().subscribe((res) => {
      if (res) this._navbar.send(res);
    });

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err && err instanceof HttpErrorResponse && err.status == 401) {
          const refreshToken = this._localStorageService.getFreshToken();
          if (accessToken && refreshToken) {
            return this.refreshToken(req, next);
          }
        } else if (err instanceof HttpErrorResponse && err.status == 403) {
          return this.logoutAndRedirect(err);
        } else {
          return throwError(err) as any;
        }
      })
    );
  }

  addAccessTokenHeader(req: HttpRequest<any>, accessToken: string) {
    // req = req.clone({
    //   headers: ),
    // });

    req.headers.append('Authorization', `Bearer ${accessToken}`);
    return req;
  }

  logoutAndRedirect(err: HttpErrorResponse): Observable<any> {
    this._navbar.send({ id: '' });
    this._authService.logout();
    this._router.navigate(['/login']);
    return throwError(err);
  }

  refreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next('');

      return this._authService.refreshToken().pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(res.accessToken);
          req = this.addAccessTokenHeader(req, res.accessToken);
          return next.handle(req);
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          req = this.addAccessTokenHeader(req, token);
          return next.handle(req);
        })
      );
    }
  }
}
