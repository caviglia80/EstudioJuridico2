import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbogadosModalComponent, ABOGADOS_MODAL_CONFIG, ModalHeaderComponent } from '@shared/components';
import { ModalService } from '@shared/modal';
import { CONTACT, CONTACT_OPTIONS } from '@shared/utils';

@Component({
    selector: 'ej-contacto-modal',
    imports: [ModalHeaderComponent],
    templateUrl: './contacto-modal.component.html',
    styleUrl: './contacto-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoModalComponent {
    private readonly modalService = inject(ModalService);

    protected readonly iframeCargado = signal(false);
    protected readonly contact = CONTACT;
    protected readonly abogado = CONTACT_OPTIONS[0];

    protected onIframeLoad(): void {
        this.iframeCargado.set(true);
    }

    protected openAbogados(): void {
        this.modalService.open(AbogadosModalComponent, ABOGADOS_MODAL_CONFIG);
    }
}
