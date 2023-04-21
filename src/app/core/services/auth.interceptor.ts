import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NzNotificationService,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorization = this.authService.getToken();
    if (authorization) {
      const authReq = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${authorization}`,
          }
        });
      return next.handle(authReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.showMessages(event.body[`messages`]);
          }
        }, error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              // this.authService.logout();
              // this.authService.redirect(this.router.url);
              this.notificationService.create(
                'warning',
                'Session Expired!',
                'Your session has expired. Please login once again.'
              );
            } else if (error.status === 403) {
              // this.authService.logout();
              // this.authService.redirect(this.router.url);
              this.notificationService.create(
                'warning',
                'Unauthorized!',
                'You do not have access to that'
              );
            } else {
              this.showMessages(error.error[`messages`]);
            }
          }
        })
      );
    } else {
      const authReq = req.clone({});
      return next.handle(authReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.showMessages(event.body[`messages`]);
          }
        }, error => {
          if (error instanceof HttpErrorResponse) {
            this.showMessages(error.error[`messages`]);
          }
        })
      );
    }
  }

  showMessages(messages: Msg[]) {
    if (messages) {
      for (const m of messages) {
        this.notificationService.create(m.msgType.toLowerCase(), m.msgType, m[`msg`]);
      }
    }
  }
}

export class Msg {
  msg: string;
  msgType: string;
}
