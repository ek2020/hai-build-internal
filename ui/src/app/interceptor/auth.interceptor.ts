import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APP_CONSTANTS } from '../constants/app.constants';
import { AuthStateService } from '../services/auth/auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedUrls = ['https://api.atlassian.com'];

  constructor(private authState: AuthStateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Check if the URL should be excluded
    if (this.isExcludedUrl(request.url)) {
      return next.handle(request);
    }

    const encodedAccessCode = localStorage.getItem(
      APP_CONSTANTS.APP_PASSCODE_KEY,
    );

    // Only redirect if not already on login page
    if (!encodedAccessCode && !window.location.href.includes('login')) {
      this.authState.logout();
      return throwError(() => new Error('Access code required'));
    }

    request = request.clone({
      url: this.appendBaseUrl(request.url),
    });

    // Add decoded access code header if available
    if (encodedAccessCode) {
      request = request.clone({
        setHeaders: {
          'X-Access-Code': encodedAccessCode,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {        
        if (!request.url.includes('auth/verify_access_token')) {
          if (error.status === 401 || error.status === 403) {
            this.authState.logout('Session expired. Please login again.');
          }
        }
        return throwError(() => error);
      }),
    );
  }

  private isExcludedUrl(url: string): boolean {
    return this.excludedUrls.some(
      (excludedUrl) => url.includes(excludedUrl)
    );
  }

  private appendBaseUrl(url: string): string {
    const baseURL = localStorage.getItem(APP_CONSTANTS.APP_URL);
    return `${baseURL}/api/${url}`;
  }
}
