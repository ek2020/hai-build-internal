import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStateService } from '../services/auth/auth-state.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  if (!authState.isAuthenticated()) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
  return true;
};