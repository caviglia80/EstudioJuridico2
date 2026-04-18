import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment';

import type { AuthUser, ChangePasswordRequest, LoginRequest, LoginResponse } from './auth.types';

const TOKEN_STORAGE_KEY = 'ej_auth_token';
const USER_STORAGE_KEY = 'ej_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.gideonBaseUrl;

    private readonly tokenSignal = signal<string | null>(this.loadToken());
    private readonly userSignal = signal<AuthUser | null>(this.parseUser(this.readStorage(USER_STORAGE_KEY)));

    readonly token = this.tokenSignal.asReadonly();
    readonly user = this.userSignal.asReadonly();
    readonly isAuthenticated = computed(() => this.tokenSignal() !== null && !this.isTokenExpired(this.tokenSignal()));

    async login(credentials: LoginRequest): Promise<AuthUser> {
        const response = await firstValueFrom(
            this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, credentials),
        );
        this.persistSession(response.token, response.user);
        return response.user;
    }

    async changePassword(payload: ChangePasswordRequest): Promise<void> {
        await firstValueFrom(
            this.http.post<void>(`${this.baseUrl}/api/auth/change-password`, payload),
        );
    }

    logout(): void {
        this.tokenSignal.set(null);
        this.userSignal.set(null);
        this.removeStorage(TOKEN_STORAGE_KEY);
        this.removeStorage(USER_STORAGE_KEY);
    }

    private loadToken(): string | null {
        const token = this.readStorage(TOKEN_STORAGE_KEY);
        if (!token || !this.isValidJwtFormat(token) || this.isTokenExpired(token)) {
            this.removeStorage(TOKEN_STORAGE_KEY);
            this.removeStorage(USER_STORAGE_KEY);
            return null;
        }
        return token;
    }

    private isValidJwtFormat(token: string): boolean {
        const parts = token.split('.');
        return parts.length === 3 && parts.every(p => p.length > 0);
    }

    private isTokenExpired(token: string | null): boolean {
        if (!token) return true;
        try {
            const payload = token.split('.')[1];
            const decoded: unknown = JSON.parse(atob(payload));
            if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
                const exp = (decoded as Record<string, unknown>)['exp'];
                if (typeof exp === 'number') {
                    return exp * 1000 < Date.now();
                }
            }
            return false;
        } catch {
            return true;
        }
    }

    private persistSession(token: string, user: AuthUser): void {
        this.tokenSignal.set(token);
        this.userSignal.set(user);
        this.writeStorage(TOKEN_STORAGE_KEY, token);
        this.writeStorage(USER_STORAGE_KEY, JSON.stringify(user));
    }

    private readStorage(key: string): string | null {
        try { return globalThis.localStorage?.getItem(key) ?? null; }
        catch { return null; }
    }

    private writeStorage(key: string, value: string): void {
        try { globalThis.localStorage?.setItem(key, value); }
        catch { /* storage no disponible */ }
    }

    private removeStorage(key: string): void {
        try { globalThis.localStorage?.removeItem(key); }
        catch { /* storage no disponible */ }
    }

    private parseUser(raw: string | null): AuthUser | null {
        if (!raw) return null;
        try {
            const parsed: unknown = JSON.parse(raw);
            if (
                typeof parsed === 'object' && parsed !== null &&
                'id' in parsed && typeof (parsed as Record<string, unknown>)['id'] === 'string' &&
                'displayName' in parsed && typeof (parsed as Record<string, unknown>)['displayName'] === 'string' &&
                'role' in parsed && typeof (parsed as Record<string, unknown>)['role'] === 'string'
            ) {
                return parsed as AuthUser;
            }
            return null;
        } catch { return null; }
    }
}
