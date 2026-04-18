import type { Routes } from '@angular/router';
import { authGuard } from '@shared/auth';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home').then((m) => m.HomeComponent),
    },
    {
        path: 'gideon',
        canActivate: [authGuard],
        loadComponent: () => import('./features/chat').then((m) => m.ChatComponent),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
