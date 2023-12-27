import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService)
  const authService = inject(AuthService)

  const url= state.url
  cookieService.delete('url')
  cookieService.set('url', url)

  if (authService.authStatus() === AuthStatus.authenticated){
    return true
  }

  if (authService.authStatus() === AuthStatus.checking){
    return false
  }

  const router= inject(Router)
  router.navigateByUrl('auth/login')

  return false
};
