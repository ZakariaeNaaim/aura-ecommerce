import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem("jwt-token")) {
    return true;
  } else {
    router.navigate(['/landing']);
    return false;
  }
};
