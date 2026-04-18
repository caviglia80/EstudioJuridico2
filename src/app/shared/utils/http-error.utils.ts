import { HttpErrorResponse } from '@angular/common/http';

/** Extrae un mensaje legible de un error HTTP. */
export function httpErrorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
        if (err.status === 0) return 'No se pudo conectar con el servidor.';
        const body: unknown = err.error;
        if (body && typeof body === 'object' && 'error' in body && typeof (body as Record<string, unknown>)['error'] === 'string') {
            return (body as Record<string, unknown>)['error'] as string;
        }
        return `Error ${err.status}.`;
    }
    return 'Ocurrió un error inesperado.';
}
