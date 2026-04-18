import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import type { OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';

import { AuthService } from '@shared/auth';
import { ModalHeaderComponent } from '@shared/components';
import { MODAL_REF, type ModalConfig, type ModalRef } from '@shared/modal';
import { httpErrorMessage } from '@shared/utils';

@Component({
    selector: 'ej-change-password-modal',
    imports: [ModalHeaderComponent, NgOptimizedImage],
    templateUrl: './change-password-modal.component.html',
    styleUrl: '../login-modal/login-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordModalComponent implements OnDestroy {
    private readonly auth = inject(AuthService);
    private readonly modalRef = inject<ModalRef>(MODAL_REF);

    protected readonly autofillUsername = computed(() => this.auth.user()?.displayName ?? 'Cuenta');
    protected readonly currentPassword = signal('');
    protected readonly newPassword = signal('');
    protected readonly confirmPassword = signal('');
    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly successMessage = signal<string | null>(null);

    private closeTimer: ReturnType<typeof setTimeout> | undefined;

    protected async submit(): Promise<void> {
        if (this.loading()) return;

        const currentPassword = this.currentPassword();
        const newPassword = this.newPassword();
        const confirmPassword = this.confirmPassword();
        const validationError = this.validate(currentPassword, newPassword, confirmPassword);

        if (validationError) {
            this.error.set(validationError);
            return;
        }

        this.error.set(null);
        this.loading.set(true);

        try {
            await this.auth.changePassword({ currentPassword, newPassword });
            this.successMessage.set('Contraseña actualizada correctamente.');
            this.closeTimer = setTimeout(() => this.modalRef.close(), 1400);
        } catch (err: unknown) {
            this.error.set(this.toErrorMessage(err));
        } finally {
            this.loading.set(false);
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.closeTimer);
    }

    private validate(currentPassword: string, newPassword: string, confirmPassword: string): string | null {
        if (!currentPassword) return 'Ingresá tu contraseña actual.';
        if (!newPassword) return 'Ingresá la nueva contraseña.';
        if (!confirmPassword) return 'Confirmá la nueva contraseña.';
        if (newPassword !== confirmPassword) return 'La confirmación no coincide con la nueva contraseña.';
        if (currentPassword === newPassword) return 'La nueva contraseña debe ser distinta de la actual.';
        return null;
    }

    private toErrorMessage(err: unknown): string {
        if (err instanceof HttpErrorResponse && err.status === 401) {
            return 'La contraseña actual es incorrecta.';
        }
        return httpErrorMessage(err);
    }
}

export const CHANGE_PASSWORD_MODAL_CONFIG: ModalConfig = { width: '420px', maxWidth: '92vw' };