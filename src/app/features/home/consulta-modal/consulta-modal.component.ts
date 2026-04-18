import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbogadosModalComponent, ABOGADOS_MODAL_CONFIG, CardButtonComponent, ModalHeaderComponent, WHATSAPP_TEXT } from '@shared/components';
import { ModalService } from '@shared/modal';
import type { ConsultaItem } from './consulta-modal.types';

@Component({
    selector: 'ej-consulta-modal',
    imports: [ModalHeaderComponent, CardButtonComponent],
    templateUrl: './consulta-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaModalComponent {
    private readonly modalService = inject(ModalService);

    protected readonly items: ConsultaItem[] = [
        { label: 'Consulta gratuita', text: 'Hola, quiero hacer una consulta legal' },
        { label: 'Urgencia legal', text: 'Hola, tengo una urgencia legal y necesito asistencia inmediata' },
        { label: 'Agendar una cita', text: 'Hola, necesito agendar una cita presencial' },
        { label: 'Accidente o despido', text: 'Hola, tuve un accidente / despido y necesito asesoramiento' },
    ];

    protected enviarTexto(txt: string): void {
        this.modalService.open(AbogadosModalComponent, {
            ...ABOGADOS_MODAL_CONFIG,
            providers: [{ provide: WHATSAPP_TEXT, useValue: txt }],
        });
    }
}
