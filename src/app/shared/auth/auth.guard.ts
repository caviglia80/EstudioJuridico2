import { inject } from '@angular/core';
import { Router } from '@angular/router';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    if (auth.isAuthenticated()) return true;
    const router = inject(Router);
    return router.createUrlTree(['/']);
};
