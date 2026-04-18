import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '@shared/modal/modal.service';
import { redirectToInstagram, redirectToFacebook } from '@shared/utils/social.utils';
import { AbogadosModalComponent, ABOGADOS_MODAL_CONFIG } from '@shared/components/abogados-modal/abogados-modal.component';
import { WhatsappIconComponent } from '@shared/components/whatsapp-icon/whatsapp-icon.component';

@Component({
    selector: 'ej-social-buttons',
    imports: [WhatsappIconComponent],
    templateUrl: './social-buttons.component.html',
    styleUrl: './social-buttons.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonsComponent {
    private readonly modalService = inject(ModalService);

    protected readonly redirectToInstagram = redirectToInstagram;
    protected readonly redirectToFacebook = redirectToFacebook;

    protected openAbogados(): void {
        this.modalService.open(AbogadosModalComponent, ABOGADOS_MODAL_CONFIG);
    }
}
