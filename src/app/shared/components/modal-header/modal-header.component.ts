import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ModalCloseDirective } from '@shared/modal/modal-close.directive';

@Component({
    selector: 'ej-modal-header',
    imports: [ModalCloseDirective],
    templateUrl: './modal-header.component.html',
    styleUrl: './modal-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
    readonly title = input.required<string>();
}
