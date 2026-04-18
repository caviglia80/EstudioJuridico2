import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '@shared/auth';
import { MenuButtonComponent } from '@shared/components';
import { ModalService, type ModalConfig } from '@shared/modal';
import { CONTACT } from '@shared/utils';

import { AreasModalComponent } from './areas-modal';
import { ChangePasswordModalComponent, CHANGE_PASSWORD_MODAL_CONFIG } from './change-password-modal';
import { ConsultaModalComponent } from './consulta-modal';
import { ContactoModalComponent } from './contacto-modal';
import { LoginModalComponent, LOGIN_MODAL_CONFIG } from './login-modal';
import { SettingsModalComponent, SETTINGS_MODAL_CONFIG, SETTINGS_MODAL_DATA } from './settings-modal';

const MODAL_CONFIG: ModalConfig = { maxWidth: '90vw', width: '1140px' };

@Component({
    selector: 'ej-home',
    imports: [NgOptimizedImage, MenuButtonComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    private readonly modalService = inject(ModalService);
    private readonly router = inject(Router);
    protected readonly auth = inject(AuthService);

    protected readonly currentYear = new Date().getFullYear();
    protected readonly hours = CONTACT.hours;

    protected openContacto(): void {
        this.modalService.open(ContactoModalComponent, MODAL_CONFIG);
    }

    protected openAreas(): void {
        this.modalService.open(AreasModalComponent, MODAL_CONFIG);
    }

    protected openConsulta(): void {
        this.modalService.open(ConsultaModalComponent, MODAL_CONFIG);
    }

    protected openLogin(): void {
        this.modalService.open(LoginModalComponent, LOGIN_MODAL_CONFIG);
    }

    protected openChangePassword(): void {
        this.modalService.open(ChangePasswordModalComponent, CHANGE_PASSWORD_MODAL_CONFIG);
    }

    protected openSettings(): void {
        this.modalService.open(SettingsModalComponent, {
            ...SETTINGS_MODAL_CONFIG,
            providers: [{
                provide: SETTINGS_MODAL_DATA,
                useValue: {
                    openChangePassword: (): void => this.openChangePassword(),
                    logout: (): void => this.logout(),
                },
            }],
        });
    }

    protected goToGideon(): void {
        void this.router.navigate(['/gideon']);
    }

    protected logout(): void {
        this.auth.logout();
    }
}
