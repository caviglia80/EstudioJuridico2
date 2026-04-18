import { CONTACT } from './contact.constants';

export function buildWhatsappUrl(tel: string, text?: string): string {
    const base = `https://wa.me/${tel}`;
    return text ? `${base}/?text=${encodeURIComponent(text)}` : base;
}

export function redirectToInstagram(): void {
    globalThis.open(CONTACT.instagramUrl, '_blank', 'noopener,noreferrer');
}

export function redirectToFacebook(): void {
    globalThis.open(CONTACT.facebookUrl, '_blank', 'noopener,noreferrer');
}
