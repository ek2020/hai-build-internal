import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthStateService } from './auth-state.service';
import { APP_CONSTANTS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authState: AuthStateService
  ) {
    this.verifyTokenOnInit();
  }

  private verifyTokenOnInit(): void {
    if (this.authState.isAuthenticated()) {
      const encodedPasscode = localStorage.getItem(APP_CONSTANTS.APP_PASSCODE_KEY)!;
      const appUrl = localStorage.getItem(APP_CONSTANTS.APP_URL)!;
      
      this.verifyAccessToken(encodedPasscode, appUrl).subscribe({
        next: (response) => {
          if (response.valid) {
            // Get return URL from query params or default to '/apps'
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps';
            this.router.navigateByUrl(returnUrl);
          } else {
            this.authState.logout('Invalid token. Please log in again.');
          }
        },
        error: () => {
          this.authState.logout('Error verifying token. Please log in again.');
        },
      });
    }
  }

  public encodeAccessCode(accessCode: string): string {
    return btoa(accessCode);
  }

  private verifyAccessToken(encodedPasscode: string, appUrl: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`auth/verify_access_token`, {
      accessToken: encodedPasscode,
      appUrl: appUrl,
    });
  }

  public verifyProviderConfig(provider: string, model: string): Observable<any> {
    return this.http.post('model/config-verification', { provider, model });
  }
  
  login(data: {
    passcode: string;
    appUrl: string;
  }): Observable<{ valid: boolean }> {
    const encodedPasscode = this.encodeAccessCode(data.passcode);
    return this.http.post<{
      valid: boolean;
    }>(`auth/verify_access_token`, {
      accessToken: encodedPasscode,
      appUrl: data.appUrl,
    }).pipe(
      tap(response => {
        if (response.valid) {
          this.authState.setIsLoggedIn(true);
          // Get return URL from query params or default to '/apps'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps';
          this.router.navigateByUrl(returnUrl);
        }
      })
    );
  }

  // Expose auth state observables
  get isLoggedIn$() {
    return this.authState.isLoggedIn$;
  }

  // Delegate authentication check to state service
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated();
  }

  // Delegate logout to state service
  logout(errorMessage?: string) {
    this.authState.logout(errorMessage);
  }

  // Add setIsLoggedIn method to match login component usage
  setIsLoggedIn(isLoggedIn: boolean) {
    this.authState.setIsLoggedIn(isLoggedIn);
  }
}
