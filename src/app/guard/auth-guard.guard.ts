import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-caparao/login.service';
import { inject } from '@angular/core';
import { take, map } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();

  if (currentUser !== undefined) {
    if (currentUser) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return authService.checkAuthStatus().pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
