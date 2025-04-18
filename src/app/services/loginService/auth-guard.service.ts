import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

export const authGuard = () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
