import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const router= inject(Router)
  const authService = inject(AuthService)

  if (authService.authStatus() === AuthStatus.authenticated && authService.currentUser()){
    router.navigateByUrl('/item')
    return false
  }

  return true
};
