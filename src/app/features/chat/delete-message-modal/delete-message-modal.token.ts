import { InjectionToken } from '@angular/core';

export interface DeleteMessageModalData {
    readonly settle: (confirmed: boolean) => void;
}

export const DELETE_MESSAGE_MODAL_DATA = new InjectionToken<DeleteMessageModalData>('DELETE_MESSAGE_MODAL_DATA');