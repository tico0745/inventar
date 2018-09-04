import { EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import * as events from './swal-events';
/**
 * <swal> component. See the README.md for usage.
 *
 * It contains a bunch of @Inputs that have a perfect 1:1 mapping with SweetAlert2 options.
 * Their types are directly coming from SweetAlert2 types defintitions, meaning that ngx-sweetalert2 is tightly coupled
 * to SweetAlert2, but also is type-safe.
 *
 * /!\ Some SweetAlert options aren't @Inputs but @Outputs: onBeforeOpen, onOpen, and onClose (without "on*" prefix).
 *     However, preConfirm and inputValidtor are still @Inputs because there are not event handlers, there can't be
 *     multiple listeners and we need the Promise they must return.
 *
 * /!\ You can notice that the SweetAlert2 `useRejections` and `expectRejections` are the only one to not have
 *     an @Input(). That's because they are deprecated and not using the default value of these parameters leads to
 *     clunky control flow. They are supported (use [options]="{}"), but please don't use them.
 */
export declare class SwalComponent implements OnChanges, OnDestroy {
    private readonly defaultSwalOptions;
    title: SweetAlertOptions['title'];
    titleText: SweetAlertOptions['titleText'];
    text: SweetAlertOptions['text'];
    html: SweetAlertOptions['html'];
    footer: SweetAlertOptions['footer'];
    type: SweetAlertOptions['type'];
    backdrop: SweetAlertOptions['backdrop'];
    toast: SweetAlertOptions['toast'];
    target: SweetAlertOptions['target'];
    input: SweetAlertOptions['input'];
    width: SweetAlertOptions['width'];
    padding: SweetAlertOptions['padding'];
    background: SweetAlertOptions['background'];
    position: SweetAlertOptions['position'];
    grow: SweetAlertOptions['grow'];
    customClass: SweetAlertOptions['customClass'];
    timer: SweetAlertOptions['timer'];
    animation: SweetAlertOptions['animation'];
    allowOutsideClick: SweetAlertOptions['allowOutsideClick'];
    allowEscapeKey: SweetAlertOptions['allowEscapeKey'];
    allowEnterKey: SweetAlertOptions['allowEnterKey'];
    showConfirmButton: SweetAlertOptions['showConfirmButton'];
    showCancelButton: SweetAlertOptions['showCancelButton'];
    confirmButtonText: SweetAlertOptions['confirmButtonText'];
    cancelButtonText: SweetAlertOptions['cancelButtonText'];
    confirmButtonColor: SweetAlertOptions['confirmButtonColor'];
    cancelButtonColor: SweetAlertOptions['cancelButtonColor'];
    confirmButtonClass: SweetAlertOptions['confirmButtonClass'];
    cancelButtonClass: SweetAlertOptions['cancelButtonClass'];
    confirmButtonAriaLabel: SweetAlertOptions['confirmButtonAriaLabel'];
    cancelButtonAriaLabel: SweetAlertOptions['cancelButtonAriaLabel'];
    buttonsStyling: SweetAlertOptions['buttonsStyling'];
    reverseButtons: SweetAlertOptions['reverseButtons'];
    focusConfirm: SweetAlertOptions['focusConfirm'];
    focusCancel: SweetAlertOptions['focusCancel'];
    showCloseButton: SweetAlertOptions['showCloseButton'];
    closeButtonAriaLabel: SweetAlertOptions['closeButtonAriaLabel'];
    showLoaderOnConfirm: SweetAlertOptions['showLoaderOnConfirm'];
    preConfirm: SweetAlertOptions['preConfirm'];
    imageUrl: SweetAlertOptions['imageUrl'];
    imageWidth: SweetAlertOptions['imageWidth'];
    imageHeight: SweetAlertOptions['imageHeight'];
    imageAlt: SweetAlertOptions['imageAlt'];
    imageClass: SweetAlertOptions['imageClass'];
    inputPlaceholder: SweetAlertOptions['inputPlaceholder'];
    inputValue: SweetAlertOptions['inputValue'];
    inputOptions: SweetAlertOptions['inputOptions'];
    inputAutoTrim: SweetAlertOptions['inputAutoTrim'];
    inputAttributes: SweetAlertOptions['inputAttributes'];
    inputValidator: SweetAlertOptions['inputValidator'];
    inputClass: SweetAlertOptions['inputClass'];
    progressSteps: SweetAlertOptions['progressSteps'];
    currentProgressStep: SweetAlertOptions['currentProgressStep'];
    progressStepsDistance: SweetAlertOptions['progressStepsDistance'];
    /**
     * Emits a BeforeOpenEvent when the modal DOM element has been created.
     * Useful to perform DOM mutations before the modal is shown.
     */
    readonly beforeOpen: EventEmitter<events.BeforeOpenEvent>;
    /**
     * Emits an OpenEvent when the modal is shown.
     */
    readonly open: EventEmitter<events.OpenEvent>;
    /**
     * Emits a CloseEvent when modal get closed.
     */
    readonly close: EventEmitter<events.CloseEvent>;
    /**
     * Emits when the user clicks "Confirm".
     * Bears a value when using "input", resolved "preConfirm", etc.
     *
     * Example:
     *     public handleConfirm(email: string): void {
     *         // ... save user email
     *     }
     */
    readonly confirm: EventEmitter<any>;
    /**
     * Emits when the user clicks "Cancel" (or dismisses the modal by any other way).
     * By default, it will emit a string representing the reason for which the SweetAlert has been closed, or the
     * value of a rejected "preConfirm".
     *
     * Example:
     *     public handleCancel(reason: string): void {
     *         // reason can be 'cancel', 'overlay', 'close', and 'timer'
     *         // ... do something
     *     }
     */
    readonly cancel: EventEmitter<any>;
    /**
     * An object of SweetAlert2 native options, useful if:
     *  - you don't want to use the @Inputs for practical/philosophical reasons ;
     *  - there are missing @Inputs because ngx-sweetalert2 isn't up-to-date with SweetAlert2's latest changes.
     *
     * /!\ Be aware that the options defined in this object will override the @Inputs of the same name.
     */
    options: SweetAlertOptions;
    nativeSwal: typeof swal;
    private isCurrentlyShown;
    private readonly touchedProps;
    private readonly markTouched;
    constructor(defaultSwalOptions: SweetAlertOptions);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Shows the SweetAlert.
     *
     * Returns the SweetAlert2 promise for convenience and use in code behind templates.
     * Otherwise, (confirm)="myHandler($event)" and (cancel)="myHandler($event)" can be used in templates.
     */
    show(): Promise<any>;
}
