import swal from 'sweetalert2';
import { InjectionToken, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ComponentFactoryResolver, Directive, HostListener, ViewContainerRef, TemplateRef, ApplicationRef, Host, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Represents an object of targets for <swal> partials (use with *swalPartial directive).
 * We must use thunks to access the swal.* functions listed below, because they get created after the first modal is
 * shown, so this object lets us reference those functions safely and in a statically-typed manner.
 */
class SwalPartialTargets {
    constructor() {
        this.title = () => swal.getTitle();
        this.content = () => swal.getContent();
        /**
         * @deprecated Will be removed in the next major version, please use {\@link SwalPartialTargets#actions} instead.
         */
        this.buttonsWrapper = () => swal.getButtonsWrapper();
        this.actions = () => swal.getActions();
        this.confirmButton = () => swal.getConfirmButton();
        this.cancelButton = () => swal.getCancelButton();
        this.footer = () => swal.getFooter();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const SwalDefaults = new InjectionToken('SwalDefaults');
/**
 * @param {?=} options
 * @return {?}
 */
function swalDefaultsProvider(options = {}) {
    return {
        provide: SwalDefaults,
        useValue: options
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * <swal> component. See the README.md for usage.
 *
 * It contains a bunch of \@Inputs that have a perfect 1:1 mapping with SweetAlert2 options.
 * Their types are directly coming from SweetAlert2 types defintitions, meaning that ngx-sweetalert2 is tightly coupled
 * to SweetAlert2, but also is type-safe.
 *
 * /!\ Some SweetAlert options aren't \@Inputs but \@Outputs: onBeforeOpen, onOpen, and onClose (without "on*" prefix).
 *     However, preConfirm and inputValidtor are still \@Inputs because there are not event handlers, there can't be
 *     multiple listeners and we need the Promise they must return.
 *
 * /!\ You can notice that the SweetAlert2 `useRejections` and `expectRejections` are the only one to not have
 *     an \@Input(). That's because they are deprecated and not using the default value of these parameters leads to
 *     clunky control flow. They are supported (use [options]="{}"), but please don't use them.
 */
class SwalComponent {
    /**
     * @param {?} defaultSwalOptions
     */
    constructor(defaultSwalOptions) {
        this.defaultSwalOptions = defaultSwalOptions;
        /**
         * Emits a BeforeOpenEvent when the modal DOM element has been created.
         * Useful to perform DOM mutations before the modal is shown.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits an OpenEvent when the modal is shown.
         */
        this.open = new EventEmitter();
        /**
         * Emits a CloseEvent when modal get closed.
         */
        this.close = new EventEmitter();
        /**
         * Emits when the user clicks "Confirm".
         * Bears a value when using "input", resolved "preConfirm", etc.
         *
         * Example:
         *     public handleConfirm(email: string): void {
         *         // ... save user email
         *     }
         */
        this.confirm = new EventEmitter();
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
        this.cancel = new EventEmitter();
        this.nativeSwal = swal;
        this.isCurrentlyShown = false;
        this.touchedProps = new Set();
        this.markTouched = this.touchedProps.add.bind(this.touchedProps);
        //=> Force `this` scope of show() on this component
        //   Useful for doing things like (click)="mySwal.show()".
        this.show = this.show.bind(this);
    }
    /**
     * An object of SweetAlert2 native options, useful if:
     *  - you don't want to use the \@Inputs for practical/philosophical reasons ;
     *  - there are missing \@Inputs because ngx-sweetalert2 isn't up-to-date with SweetAlert2's latest changes.
     *
     * /!\ Be aware that the options defined in this object will override the \@Inputs of the same name.
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        Object.assign(this, options);
        Object.keys(options).forEach(this.markTouched);
    }
    /**
     * @return {?}
     */
    get options() {
        const /** @type {?} */ options = {};
        //=> We will compute the options object based on the option keys that are known to have changed.
        // That avoids passing a gigantic object to SweetAlert2, making debugging easier and potentially avoiding
        // side effects.
        this.touchedProps.forEach(prop => {
            options[prop] = (/** @type {?} */ (this))[prop];
        });
        return options;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        Object.keys(changes)
            .filter(prop => prop !== 'options')
            .forEach(this.markTouched);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.isCurrentlyShown) {
            swal.close();
        }
    }
    /**
     * Shows the SweetAlert.
     *
     * Returns the SweetAlert2 promise for convenience and use in code behind templates.
     * Otherwise, (confirm)="myHandler($event)" and (cancel)="myHandler($event)" can be used in templates.
     * @return {?}
     */
    show() {
        //=> Build the SweetAlert2 options
        const /** @type {?} */ options = Object.assign({}, this.defaultSwalOptions, this.options, { onBeforeOpen: (modalElement) => {
                this.beforeOpen.emit({ modalElement });
            }, onOpen: (modalElement) => {
                this.isCurrentlyShown = true;
                this.open.emit({ modalElement });
            }, onClose: (modalElement) => {
                this.isCurrentlyShown = false;
                this.close.emit({ modalElement });
            } });
        //=> Show the Swal!
        const /** @type {?} */ promise = swal(options);
        //=> Handle (confirm) and (cancel) @Outputs
        // tslint:disable-next-line:no-string-literal
        const /** @type {?} */ useRejections = (/** @type {?} */ (options)).useRejections;
        promise.then(result => {
            if (useRejections) {
                this.confirm.emit(result);
            }
            else if ('value' in result) {
                this.confirm.emit(result.value);
            }
            else {
                this.cancel.emit(result.dismiss);
            }
        }, err => {
            if (useRejections) {
                this.cancel.emit(err);
            }
        });
        //=> Return the unaltered promise
        return promise;
    }
}
SwalComponent.decorators = [
    { type: Component, args: [{
                selector: 'swal',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SwalComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [SwalDefaults,] },] },
];
SwalComponent.propDecorators = {
    "title": [{ type: Input },],
    "titleText": [{ type: Input },],
    "text": [{ type: Input },],
    "html": [{ type: Input },],
    "footer": [{ type: Input },],
    "type": [{ type: Input },],
    "backdrop": [{ type: Input },],
    "toast": [{ type: Input },],
    "target": [{ type: Input },],
    "input": [{ type: Input },],
    "width": [{ type: Input },],
    "padding": [{ type: Input },],
    "background": [{ type: Input },],
    "position": [{ type: Input },],
    "grow": [{ type: Input },],
    "customClass": [{ type: Input },],
    "timer": [{ type: Input },],
    "animation": [{ type: Input },],
    "allowOutsideClick": [{ type: Input },],
    "allowEscapeKey": [{ type: Input },],
    "allowEnterKey": [{ type: Input },],
    "showConfirmButton": [{ type: Input },],
    "showCancelButton": [{ type: Input },],
    "confirmButtonText": [{ type: Input },],
    "cancelButtonText": [{ type: Input },],
    "confirmButtonColor": [{ type: Input },],
    "cancelButtonColor": [{ type: Input },],
    "confirmButtonClass": [{ type: Input },],
    "cancelButtonClass": [{ type: Input },],
    "confirmButtonAriaLabel": [{ type: Input },],
    "cancelButtonAriaLabel": [{ type: Input },],
    "buttonsStyling": [{ type: Input },],
    "reverseButtons": [{ type: Input },],
    "focusConfirm": [{ type: Input },],
    "focusCancel": [{ type: Input },],
    "showCloseButton": [{ type: Input },],
    "closeButtonAriaLabel": [{ type: Input },],
    "showLoaderOnConfirm": [{ type: Input },],
    "preConfirm": [{ type: Input },],
    "imageUrl": [{ type: Input },],
    "imageWidth": [{ type: Input },],
    "imageHeight": [{ type: Input },],
    "imageAlt": [{ type: Input },],
    "imageClass": [{ type: Input },],
    "inputPlaceholder": [{ type: Input },],
    "inputValue": [{ type: Input },],
    "inputOptions": [{ type: Input },],
    "inputAutoTrim": [{ type: Input },],
    "inputAttributes": [{ type: Input },],
    "inputValidator": [{ type: Input },],
    "inputClass": [{ type: Input },],
    "progressSteps": [{ type: Input },],
    "currentProgressStep": [{ type: Input },],
    "progressStepsDistance": [{ type: Input },],
    "beforeOpen": [{ type: Output },],
    "open": [{ type: Output },],
    "close": [{ type: Output },],
    "confirm": [{ type: Output },],
    "cancel": [{ type: Output },],
    "options": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * [swal] directive. It takes a value that defines the Sweet Alert and can be of three types:
 *
 * 1) A simple array of two or three strings defining [title, text, type] - the type being optional, ex:
 *
 *    <button [swal]="['Title', 'Text']">Click me</button>
 *
 * 2) A native SweetAlert2 options object, ex:
 *
 *    <button [swal]="{ title: 'Title', text: 'Text' }">Click me</button>
 *
 * 3) A reference to an existing SwalComponent instance for more advanced uses, ex:
 *
 *    <button [swal]="mySwal">Click me</button>
 *    <swal #mySwal title="Title" text="Text"></swal>
 */
class SwalDirective {
    /**
     * @param {?} viewContainerRef
     * @param {?} resolver
     */
    constructor(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        /**
         * Emits when the user clicks "Confirm".
         * Bears a value when using "input", resolved "preConfirm", etc.
         *
         * Example:
         *     public handleConfirm(email: string): void {
         *         // ... save user email
         *     }
         */
        this.confirm = new EventEmitter();
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
        this.cancel = new EventEmitter();
    }
    /**
     * SweetAlert2 options or a SwalComponent instance.
     * See the class doc block for more informations.
     * @param {?} options
     * @return {?}
     */
    set swal(options) {
        if (options instanceof SwalComponent) {
            this.swalInstance = options;
        }
        else if (Array.isArray(options)) {
            this.swalOptions = swal.argsToParams(options);
        }
        else {
            this.swalOptions = options;
        }
    }
    /**
     * OnInit lifecycle handler.
     * Creates a SwalComponent instance if the user didn't provided one and binds on that component (confirm) and
     * (cancel) outputs to reemit on the directive.
     * @return {?}
     */
    ngOnInit() {
        if (!this.swalInstance) {
            const /** @type {?} */ factory = this.resolver.resolveComponentFactory(SwalComponent);
            this.swalRef = this.viewContainerRef.createComponent(factory);
            this.swalInstance = this.swalRef.instance;
        }
    }
    /**
     * OnDestroy lifecycle handler.
     * Destroys the dynamically-created SwalComponent and unsubscribes from that component's (confirm) and (cancel).
     * @return {?}
     */
    ngOnDestroy() {
        if (this.swalRef) {
            this.swalRef.destroy();
        }
    }
    /**
     * Click handler.
     * The directive listens for onclick events on its host element.
     * When this happens, it shows the <swal> attached to this directive.
     * @param {?} event
     * @return {?}
     */
    onHostClicked(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        if (this.swalOptions) {
            this.swalInstance.options = this.swalOptions;
        }
        const /** @type {?} */ confirmSub = this.swalInstance.confirm.asObservable().subscribe(v => this.confirm.emit(v));
        const /** @type {?} */ cancelSub = this.swalInstance.cancel.asObservable().subscribe(v => this.cancel.emit(v));
        this.swalInstance.show().then(unsubscribe);
        /**
         * @return {?}
         */
        function unsubscribe() {
            confirmSub.unsubscribe();
            cancelSub.unsubscribe();
        }
    }
}
SwalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[swal]'
            },] },
];
/** @nocollapse */
SwalDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
];
SwalDirective.propDecorators = {
    "swal": [{ type: Input },],
    "confirm": [{ type: Output },],
    "cancel": [{ type: Output },],
    "onHostClicked": [{ type: HostListener, args: ['click', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@internal
 * Holds a consumer's Angular template and displays it on a Sweet Alert.
 * See SwalPartialDirective for info about the covered feature.
 */
class SwalPartialComponent {
}
SwalPartialComponent.decorators = [
    { type: Component, args: [{
                template: '<ng-container *ngTemplateOutlet="template"></ng-container>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
SwalPartialComponent.ctorParameters = () => [];
SwalPartialComponent.propDecorators = {
    "template": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A structural directive that lets you use Angular templates inside of Sweet Alerts.
 * There are different targetable zones in a Sweet Alert: title, content, confirmButton, cancelButton, buttonsWrapper.
 * The default target is the content zone.
 *
 * Usage in your component's TypeScript code-behind (if you use another target than "content"):
 *
 *     \@Component({ ... })
 *     export class MyComponent {
 *         public constructor(public readonly swalTargets: SwalPartialTargets) {
 *         }
 *     }
 *
 * Usage in the template:
 *
 *     <swal title="Fill the form" (confirm)="confirmHandler()">
 *         <!-- This form will be displayed as the alert main content
 *              Targets the alert's main content zone by default -->
 *         <form *swalPartial [formControl]="myForm">
 *             ...
 *         </form>
 *
 *         <!-- This targets the confirm button's inner content
 *              Notice the usage of ng-container to avoid creating an useless DOM element inside the button -->
 *         <ng-container *swalPartial="swalTargets.confirmButton">
 *              Send ({{ secondsLeft }} seconds left)
 *         </ng-container>
 *     <swal>
 */
class SwalPartialDirective {
    /**
     * @param {?} resolver
     * @param {?} injector
     * @param {?} app
     * @param {?} templateRef
     * @param {?} swalTargets
     * @param {?} swalComponent
     */
    constructor(resolver, injector, app, templateRef, swalTargets, swalComponent) {
        this.resolver = resolver;
        this.injector = injector;
        this.app = app;
        this.templateRef = templateRef;
        this.swalTargets = swalTargets;
        this.swalComponent = swalComponent;
    }
    /**
     * Subscribes to the the Sweet Alert appearance/disappearance to create/destroy the SwalPartialComponent that will
     * receive the consumer's template.
     * @return {?}
     */
    ngOnInit() {
        this.beforeOpenSubscription = this.swalComponent.beforeOpen.asObservable().subscribe(() => {
            //=> Create the SwalPartialComponent on the target DOM node in the Sweet Alert
            const /** @type {?} */ targetEl = this.swalPartial ? this.swalPartial() : this.swalTargets.content();
            const /** @type {?} */ factory = this.resolver.resolveComponentFactory(SwalPartialComponent);
            this.partialRef = factory.create(this.injector, [], targetEl);
            //=> Apply the consumer's template on the component
            this.partialRef.instance.template = this.templateRef;
            //=> Make the Angular app aware of that detached view so change detection works
            this.app.attachView(this.partialRef.hostView);
        });
        this.closeSubscription = this.swalComponent.close.asObservable().subscribe(() => {
            //=> Detach the partial component from the app and destroy it
            this.app.detachView(this.partialRef.hostView);
            this.partialRef.destroy();
        });
    }
    /**
     * Unsubscribes from the Sweet Alert appearance/disappearance.
     * @return {?}
     */
    ngOnDestroy() {
        this.beforeOpenSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
    }
}
SwalPartialDirective.decorators = [
    { type: Directive, args: [{
                selector: '[swalPartial]'
            },] },
];
/** @nocollapse */
SwalPartialDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: Injector, },
    { type: ApplicationRef, },
    { type: TemplateRef, },
    { type: SwalPartialTargets, },
    { type: SwalComponent, decorators: [{ type: Host },] },
];
SwalPartialDirective.propDecorators = {
    "swalPartial": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SweetAlert2Module {
    /**
     * @param {?=} defaultSwalOptions
     * @return {?}
     */
    static forRoot(defaultSwalOptions) {
        return {
            ngModule: SweetAlert2Module,
            providers: [swalDefaultsProvider(defaultSwalOptions)]
        };
    }
}
SweetAlert2Module.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SwalComponent, SwalPartialDirective, SwalPartialComponent,
                    SwalDirective
                ],
                providers: [
                    SwalPartialTargets
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    SwalComponent, SwalPartialDirective,
                    SwalDirective
                ],
                entryComponents: [
                    SwalComponent, SwalPartialComponent
                ]
            },] },
];
/** @nocollapse */
SweetAlert2Module.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { SwalPartialTargets, SwalComponent, SwalDirective, SwalPartialDirective, SweetAlert2Module, SwalDefaults as ɵa, swalDefaultsProvider as ɵb, SwalPartialComponent as ɵc };
//# sourceMappingURL=toverux-ngx-sweetalert2.js.map
