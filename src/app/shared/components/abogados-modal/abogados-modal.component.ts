import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { ContactCardComponent } from '@shared/components/contact-card/contact-card.component';
import { buildWhatsappUrl } from '@shared/utils/social.utils';
import { CONTACT_OPTIONS } from '@shared/utils/contact.constants';
import type { ContactOption } from '@shared/utils/contact.types';
import { WHATSAPP_TEXT } from './abogados-modal.token';

export const ABOGADOS_MODAL_CONFIG = { maxWidth: '500px', width: '90vw' } as const;

@Component({
    selector: 'ej-abogados-modal',
    imports: [ModalHeaderComponent, ContactCardComponent],
    templateUrl: './abogados-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbogadosModalComponent {
    private readonly text = inject(WHATSAPP_TEXT, { optional: true });
    protected readonly options = CONTACT_OPTIONS;

    protected seleccionar(person: ContactOption): void {
        const url = person.isLandline
            ? `tel:${person.tel}`
            : buildWhatsappUrl(person.tel, this.text ?? undefined);
        globalThis.open(url, '_blank', 'noopener,noreferrer');
    }
}
