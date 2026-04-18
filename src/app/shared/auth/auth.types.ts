export interface AuthUser {
    readonly id: string;
    readonly displayName: string;
    readonly role: string;
}

export interface LoginRequest {
    readonly password: string;
}

export interface LoginResponse {
    readonly token: string;
    readonly user: AuthUser;
}

export interface ChangePasswordRequest {
    readonly currentPassword: string;
    readonly newPassword: string;
}
