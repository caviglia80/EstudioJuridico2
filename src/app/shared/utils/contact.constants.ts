import type { ContactOption } from './contact.types';

export const CONTACT = {
    studioName: 'Caviglia y Asociados',
    whatsapp: '5492364658333',
    whatsappDisplay: '+54 2364 658333',
    phone: '+54 236 4437032',
    phoneLabel: 'Tel. fijo estudio',
    email: 'estudiocavigliayasoc@fibertel.com.ar',
    address: 'Roque Vázquez 73, Junín, Buenos Aires',
    hours: '10:00–14:00 h',
    instagramUrl: 'https://www.instagram.com/cavigliayasociados',
    facebookUrl: 'https://www.facebook.com/CavigliayAsoc/',
} as const;

export const CONTACT_OPTIONS: ContactOption[] = [
    { fullName: 'Ramiro Caviglia', tel: CONTACT.whatsapp, displayPhone: CONTACT.whatsappDisplay },
    { fullName: CONTACT.studioName, tel: CONTACT.phone, displayPhone: CONTACT.phone, isLandline: true },
];
