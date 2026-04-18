import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModalHeaderComponent } from '@shared/components';
import { MODAL_REF, type ModalConfig, type ModalRef } from '@shared/modal';

import { SETTINGS_MODAL_DATA } from './settings-modal.token';

@Component({
    selector: 'ej-settings-modal',
    imports: [ModalHeaderComponent],
    templateUrl: './settings-modal.component.html',
    styleUrl: './settings-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsModalComponent {
    private readonly modalRef = inject<ModalRef>(MODAL_REF);
    private readonly data = inject(SETTINGS_MODAL_DATA);

    protected openChangePassword(): void {
        this.modalRef.close();
        this.data.openChangePassword();
    }

    protected logout(): void {
        this.modalRef.close();
        this.data.logout();
    }
}

export const SETTINGS_MODAL_CONFIG: ModalConfig = {
    width: '420px',
    maxWidth: '92vw',
};