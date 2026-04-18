import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ej-area-card',
    templateUrl: './area-card.component.html',
    styleUrl: './area-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaCardComponent {
    readonly title = input.required<string>();
    readonly items = input.required<readonly string[]>();
}
