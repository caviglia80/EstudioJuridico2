import { Directive, inject } from '@angular/core';
import { MODAL_REF } from './modal.token';

@Directive({
    selector: '[ejModalClose]',
    host: { '(click)': 'close()' },
})
export class ModalCloseDirective {
    private readonly modalRef = inject(MODAL_REF);

    protected close(): void {
        this.modalRef.close();
    }
}
