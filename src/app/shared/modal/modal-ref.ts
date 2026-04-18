export class ModalRef {
    private closeFn: (() => void) | undefined;

    /** @internal */
    _init(fn: () => void): void {
        this.closeFn = fn;
    }

    close(): void {
        const fn = this.closeFn;
        this.closeFn = undefined;
        fn?.();
    }
}
