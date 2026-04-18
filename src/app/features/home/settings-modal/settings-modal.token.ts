import { InjectionToken } from '@angular/core';

export interface SettingsModalData {
    readonly openChangePassword: () => void;
    readonly logout: () => void;
}

export const SETTINGS_MODAL_DATA = new InjectionToken<SettingsModalData>('SETTINGS_MODAL_DATA');