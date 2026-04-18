import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

import { ModalHeaderComponent } from '@shared/components';
import { MODAL_REF, type ModalConfig, type ModalRef } from '@shared/modal';

import { DELETE_MESSAGE_MODAL_DATA } from './delete-message-modal.token';

@Component({
    selector: 'ej-delete-message-modal',
    imports: [ModalHeaderComponent],
    templateUrl: './delete-message-modal.component.html',
    styleUrl: './delete-message-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteMessageModalComponent {
    private readonly modalRef = inject<ModalRef>(MODAL_REF);
    private readonly data = inject(DELETE_MESSAGE_MODAL_DATA);
    private readonly destroyRef = inject(DestroyRef);

    private settled = false;

    constructor() {
        this.destroyRef.onDestroy(() => {
            this.settle(false);
        });
    }

    protected cancel(): void {
        this.settle(false);
        this.modalRef.close();
    }

    protected confirm(): void {
        this.settle(true);
        this.modalRef.close();
    }

    private settle(confirmed: boolean): void {
        if (this.settled) { return; }
        this.settled = true;
        this.data.settle(confirmed);
    }
}

export const DELETE_MESSAGE_MODAL_CONFIG: ModalConfig = {
    width: '420px',
    maxWidth: '92vw',
};