import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem("jwt-token");
  
  if (token && authService.isAuthenticated) {
    const expectedRoles = route.data['role'] as string[];
    
    if (expectedRoles && expectedRoles.length > 0) {
      const userRoles = authService.userProfile?.role || [];
      const hasRole = expectedRoles.some(role => userRoles.includes(role));

      if (!hasRole) {
        router.navigate(['/landing']);
        return false;
      }
    }
    
    return true;
  } else {
    router.navigate(['/landing']);
    return false;
  }
};
