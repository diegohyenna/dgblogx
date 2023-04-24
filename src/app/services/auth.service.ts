import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';
import { NavbarEmmiterService } from './navbar-emitter.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $User: BehaviorSubject<User> = new BehaviorSubject<User>({});

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _errorService: ErrorService,
    private _navbar: NavbarEmmiterService
  ) {}

  signUp(data: any): Observable<any> {
    return this._http.post<any>(`${environment.apiUrl}/user`, data).pipe(
      tap((res) => {
        this._localStorageService.setTokens(
          JSON.stringify(res),
          JSON.stringify(res)
        );
        this.$User.next(res[0]);
      }),
      catchError((err) => this._errorService.handleError(err))
    );
  }

  login(data: any): Observable<any> {
    return this._http
      .get<any>(
        `${environment.apiUrl}/user?email=${data.email}&password=${data.password}`
      )
      .pipe(
        tap((res) => {
          this._localStorageService.setTokens(
            JSON.stringify(res),
            JSON.stringify(res)
          );
          this.$User.next(res[0]);
        }),
        catchError((err) => this._errorService.handleError(err))
      );
  }

  logout() {
    this._localStorageService.clearTokens();
    this._navbar.send({ id: '' });
    this.$User.next({});
  }

  fetchUserData(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/user`).pipe(
      tap((res) => {
        this.$User.next({
          id: res.id,
          first_name: res.first_name,
          role: res.role,
        });
      }),
      catchError((err) => this._errorService.handleError(err))
    );
  }

  editUser(data: any) {
    return this._http
      .put(`${environment.apiUrl}/user/editProfile`, data)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  getLoggedInUserData(): Observable<any> {
    const userLogged = this._localStorageService.getAccessToken();

    return userLogged ? of(JSON.parse(userLogged)[0]) : of(null);
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = this._localStorageService.getFreshToken();
    return this._http
      .post<{ accessToken: string; refreshToken: string }>(
        `${environment.apiUrl}/user/me/refresToken`,
        { refreshToken }
      )
      .pipe(
        tap((res) => {
          console.log('Token refreshed!');
          this._localStorageService.setTokens(
            JSON.stringify(res),
            JSON.stringify(res)
          );
        })
      );
  }

  getBloggerProfile(userId: String) {
    return this._http
      .get(`${environment.apiUrl}/user/${userId}`)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }
}
