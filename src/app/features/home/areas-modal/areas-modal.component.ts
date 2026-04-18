import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AreaCardComponent, ModalHeaderComponent } from '@shared/components';
import type { AreaItem } from './areas-modal.types';

@Component({
    selector: 'ej-areas-modal',
    imports: [ModalHeaderComponent, AreaCardComponent],
    templateUrl: './areas-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreasModalComponent {
    protected readonly areas: AreaItem[] = [
        {
            title: 'Civil y Comercial',
            items: [
                'Accidentes de tránsito',
                'Reclamos por daños y perjuicios',
                'Sucesiones y herencias',
                'Prescripción adquisitiva (usucapión)',
                'Redacción y revisión de contratos',
            ],
        },
        {
            title: 'Laboral',
            items: [
                'Despidos e indemnizaciones',
                'Accidentes y enfermedades laborales (ART)',
                'Empleo no registrado',
                'Reclamos por diferencias salariales',
                'Modalidades contractuales',
                'Asesoramiento al trabajador',
                'Asesoramiento empresarial',
            ],
        },
        {
            title: 'Familia',
            items: [
                'Divorcio y liquidación de bienes',
                'Cuota alimentaria',
                'Cuidado personal de hijos',
                'Régimen de comunicación parental',
                'Responsabilidad parental',
                'Protección contra violencia familiar',
            ],
        },
        {
            title: 'Otras Áreas',
            items: [
                'Reclamos a prepagas y obras sociales',
                'Amparos de salud',
                'Concursos y quiebras',
                'Desalojos',
                'Consultanos cualquier situación legal',
            ],
        },
    ];
}
