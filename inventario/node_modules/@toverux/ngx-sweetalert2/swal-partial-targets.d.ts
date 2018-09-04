/**
 * Represents an object of targets for <swal> partials (use with *swalPartial directive).
 * We must use thunks to access the swal.* functions listed below, because they get created after the first modal is
 * shown, so this object lets us reference those functions safely and in a statically-typed manner.
 */
export declare class SwalPartialTargets {
    readonly title: () => HTMLElement;
    readonly content: () => HTMLElement;
    /**
     * @deprecated Will be removed in the next major version, please use {@link SwalPartialTargets#actions} instead.
     */
    readonly buttonsWrapper: () => HTMLElement;
    readonly actions: () => HTMLElement;
    readonly confirmButton: () => HTMLElement;
    readonly cancelButton: () => HTMLElement;
    readonly footer: () => HTMLElement;
}
