import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import type { OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '@shared/auth';
import { ModalHeaderComponent } from '@shared/components';
import { MODAL_REF, type ModalConfig, type ModalRef } from '@shared/modal';
import { httpErrorMessage } from '@shared/utils';

@Component({
    selector: 'ej-login-modal',
    imports: [ModalHeaderComponent, NgOptimizedImage],
    templateUrl: './login-modal.component.html',
    styleUrl: './login-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent implements OnDestroy {
    private readonly auth = inject(AuthService);
    private readonly modalRef = inject<ModalRef>(MODAL_REF);

    protected readonly autofillUsername = 'Estudio Caviglia';
    protected readonly password = signal('');
    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly successName = signal<string | null>(null);

    private closeTimer: ReturnType<typeof setTimeout> | undefined;

    protected async submit(): Promise<void> {
        if (this.loading()) return;
        const pass = this.password();
        if (!pass) {
            this.error.set('Ingresá tu contraseña.');
            return;
        }
        this.error.set(null);
        this.loading.set(true);
        try {
            const result = await this.auth.login({ password: pass });
            this.successName.set(result.displayName);
            this.closeTimer = setTimeout(() => this.modalRef.close(), 1200);
        } catch (err: unknown) {
            this.error.set(this.toErrorMessage(err));
        } finally {
            this.loading.set(false);
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.closeTimer);
    }

    private toErrorMessage(err: unknown): string {
        if (err instanceof HttpErrorResponse && err.status === 401) {
            return 'Contraseña incorrecta.';
        }
        return httpErrorMessage(err);
    }
}

export const LOGIN_MODAL_CONFIG: ModalConfig = { width: '420px', maxWidth: '92vw' };
