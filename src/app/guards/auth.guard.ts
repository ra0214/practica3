import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const router = inject(Router);

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
