import type {
    ComponentRef,
    StaticProvider,
    Type
} from '@angular/core';
import {
    ApplicationRef,
    EnvironmentInjector,
    Injectable,
    Injector,
    createComponent,
    inject,
} from '@angular/core';
import { ModalRef } from './modal-ref';
import { MODAL_REF } from './modal.token';

export interface ModalConfig {
    width?: string;
    maxWidth?: string;
    providers?: StaticProvider[];
}

const FOCUSABLE = 'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

let modalIdCounter = 0;

@Injectable({ providedIn: 'root' })
export class ModalService {
    private readonly appRef = inject(ApplicationRef);
    private readonly envInjector = inject(EnvironmentInjector);

    open<T>(component: Type<T>, config?: ModalConfig): ModalRef {
        const modalId = `modal-${++modalIdCounter}`;
        const { overlay, dialog } = this.buildOverlay(config);
        const modalRef = new ModalRef();
        const previouslyFocused = document.activeElement as HTMLElement | null;

        const compRef = createComponent(component, {
            environmentInjector: this.envInjector,
            elementInjector: Injector.create({
                providers: [
                    { provide: MODAL_REF, useValue: modalRef },
                    ...(config?.providers ?? []),
                ],
                parent: this.envInjector,
            }),
        });

        this.appRef.attachView(compRef.hostView);
        dialog.appendChild(compRef.location.nativeElement);
        document.body.appendChild(overlay);

        // Conectar aria-labelledby con el título del modal-header
        const titleEl = dialog.querySelector('.visually-hidden');
        if (titleEl) {
            titleEl.id = `${modalId}-title`;
            overlay.setAttribute('aria-labelledby', `${modalId}-title`);
        }

        // Foco inicial en el primer elemento focusable
        requestAnimationFrame(() => {
            const first = dialog.querySelector<HTMLElement>(FOCUSABLE);
            (first ?? dialog).focus();
        });

        const escHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') modalRef.close();
        };

        // Focus trap: Tab/Shift+Tab dentro del dialog
        const tabTrapHandler = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (focusable.length === 0) { e.preventDefault(); return; }
            const first = focusable[0];
            const last = focusable.at(-1) as HTMLElement;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        modalRef._init(() => {
            document.removeEventListener('keydown', escHandler);
            dialog.removeEventListener('keydown', tabTrapHandler);
            this.destroy(overlay, compRef);
            previouslyFocused?.focus();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) modalRef.close();
        });

        document.addEventListener('keydown', escHandler);
        dialog.addEventListener('keydown', tabTrapHandler);

        return modalRef;
    }

    private destroy<T>(overlay: HTMLElement, compRef: ComponentRef<T>): void {
        this.appRef.detachView(compRef.hostView);
        compRef.destroy();
        overlay.remove();
    }

    private buildOverlay(config: ModalConfig | undefined): { overlay: HTMLElement; dialog: HTMLElement } {
        const overlay = document.createElement('div');
        overlay.className = 'app-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');

        const dialog = document.createElement('div');
        dialog.className = 'app-modal-dialog';
        dialog.setAttribute('tabindex', '-1');
        if (config?.width) dialog.style.width = config.width;
        if (config?.maxWidth) dialog.style.maxWidth = config.maxWidth;

        overlay.appendChild(dialog);
        return { overlay, dialog };
    }
}
