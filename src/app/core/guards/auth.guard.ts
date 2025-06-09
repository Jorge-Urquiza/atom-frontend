import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  return session.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
