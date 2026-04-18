import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'ej-card-button',
    templateUrl: './card-button.component.html',
    styleUrl: './card-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButtonComponent {
    readonly label = input.required<string>();
    readonly action = output<void>();
}
