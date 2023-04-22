import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from './local-storage.service';
import {isObjectEmpty} from './util';
import {URL_SHORTENER_CONST, URLS} from './config';
import {environment} from '../../../environments/environment';
import {AuthRequest} from '../data/auth.request';
import {AuthResponse, User} from '../data/auth.response';
import {Observable, Subscription} from 'rxjs';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private path = `${environment.baseUrl}/api/v1/user`;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient,
              private router: Router, private notificationService: NzNotificationService) {
  }

  isTokenPresent() {
    const token = this.localStorageService.get(URL_SHORTENER_CONST.CURRENT_TOKEN_KEY);
    return !isObjectEmpty(token);
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.path}/signup`, user);
  }

  login(authRequest: AuthRequest): Observable<any> {
    return this.http.post<any>(`${this.path}/login`, authRequest);
  }

  loginResponse(authResponse: AuthResponse) {
    if (authResponse) {
      this.localStorageService.save(URL_SHORTENER_CONST.CURRENT_TOKEN_KEY, authResponse.auth.token);
      this.notificationService.create('success', 'Login Successful', `Welcome ${authResponse.firstName}`);
      this.user = new User(authResponse.auth.userName, authResponse.firstName, authResponse.lastName);
      const routeUser = this.getRedirectLink();
      this.router.navigate([routeUser ? routeUser !== URLS.login ? routeUser : 'app' : 'app']);
      this.clearRedirect();
    }
  }

  clearAuth() {
    localStorage.removeItem(URL_SHORTENER_CONST.CURRENT_TOKEN_KEY);
  }

  getToken() {
    const token = this.localStorageService.get(URL_SHORTENER_CONST.CURRENT_TOKEN_KEY);
    return isObjectEmpty(token) ? null : token;
  }

  isLoggedIn = (): boolean => this.isTokenPresent();

  redirect(url) {
    this.localStorageService.save(URL_SHORTENER_CONST.REDIRECT_KEY, url);
  }

  getRedirectLink() {
    return this.localStorageService.get(URL_SHORTENER_CONST.REDIRECT_KEY);
  }

  clearRedirect() {
    this.localStorageService.remove(URL_SHORTENER_CONST.REDIRECT_KEY);
  }

  logout() {
    this.clearAuth();
    this.router.navigate([URLS.login]);
  }

  me(): Observable<any> {
    if (!this.user) {
      return this.http.get(`${this.path}/me`);
    } else {
      return new Observable<{ payload: User }>(subscriber => {
        subscriber.next({payload: this.user});
        subscriber.complete();
      });
    }
  }
}
