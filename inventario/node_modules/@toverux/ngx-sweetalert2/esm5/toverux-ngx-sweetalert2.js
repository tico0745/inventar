import swal from 'sweetalert2';
import { InjectionToken, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ComponentFactoryResolver, Directive, HostListener, ViewContainerRef, TemplateRef, ApplicationRef, Host, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var SwalPartialTargets = /** @class */ (function () {
    function SwalPartialTargets() {
        this.title = function () { return swal.getTitle(); };
        this.content = function () { return swal.getContent(); };
        this.buttonsWrapper = function () { return swal.getButtonsWrapper(); };
        this.actions = function () { return swal.getActions(); };
        this.confirmButton = function () { return swal.getConfirmButton(); };
        this.cancelButton = function () { return swal.getCancelButton(); };
        this.footer = function () { return swal.getFooter(); };
    }
    return SwalPartialTargets;
}());
var SwalDefaults = new InjectionToken('SwalDefaults');
function swalDefaultsProvider(options) {
    if (options === void 0) { options = {}; }
    return {
        provide: SwalDefaults,
        useValue: options
    };
}
var SwalComponent = /** @class */ (function () {
    function SwalComponent(defaultSwalOptions) {
        this.defaultSwalOptions = defaultSwalOptions;
        this.beforeOpen = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.confirm = new EventEmitter();
        this.cancel = new EventEmitter();
        this.nativeSwal = swal;
        this.isCurrentlyShown = false;
        this.touchedProps = new Set();
        this.markTouched = this.touchedProps.add.bind(this.touchedProps);
        this.show = this.show.bind(this);
    }
    Object.defineProperty(SwalComponent.prototype, "options", {
        get: function () {
            var _this = this;
            var options = {};
            this.touchedProps.forEach(function (prop) {
                options[prop] = ((_this))[prop];
            });
            return options;
        },
        set: function (options) {
            Object.assign(this, options);
            Object.keys(options).forEach(this.markTouched);
        },
        enumerable: true,
        configurable: true
    });
    SwalComponent.prototype.ngOnChanges = function (changes) {
        Object.keys(changes)
            .filter(function (prop) { return prop !== 'options'; })
            .forEach(this.markTouched);
    };
    SwalComponent.prototype.ngOnDestroy = function () {
        if (this.isCurrentlyShown) {
            swal.close();
        }
    };
    SwalComponent.prototype.show = function () {
        var _this = this;
        var options = Object.assign({}, this.defaultSwalOptions, this.options, { onBeforeOpen: function (modalElement) {
                _this.beforeOpen.emit({ modalElement: modalElement });
            }, onOpen: function (modalElement) {
                _this.isCurrentlyShown = true;
                _this.open.emit({ modalElement: modalElement });
            }, onClose: function (modalElement) {
                _this.isCurrentlyShown = false;
                _this.close.emit({ modalElement: modalElement });
            } });
        var promise = swal(options);
        var useRejections = ((options)).useRejections;
        promise.then(function (result) {
            if (useRejections) {
                _this.confirm.emit(result);
            }
            else if ('value' in result) {
                _this.confirm.emit(result.value);
            }
            else {
                _this.cancel.emit(result.dismiss);
            }
        }, function (err) {
            if (useRejections) {
                _this.cancel.emit(err);
            }
        });
        return promise;
    };
    return SwalComponent;
}());
SwalComponent.decorators = [
    { type: Component, args: [{
                selector: 'swal',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
SwalComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [SwalDefaults,] },] },
]; };
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
var SwalDirective = /** @class */ (function () {
    function SwalDirective(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.confirm = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    Object.defineProperty(SwalDirective.prototype, "swal", {
        set: function (options) {
            if (options instanceof SwalComponent) {
                this.swalInstance = options;
            }
            else if (Array.isArray(options)) {
                this.swalOptions = swal.argsToParams(options);
            }
            else {
                this.swalOptions = options;
            }
        },
        enumerable: true,
        configurable: true
    });
    SwalDirective.prototype.ngOnInit = function () {
        if (!this.swalInstance) {
            var factory = this.resolver.resolveComponentFactory(SwalComponent);
            this.swalRef = this.viewContainerRef.createComponent(factory);
            this.swalInstance = this.swalRef.instance;
        }
    };
    SwalDirective.prototype.ngOnDestroy = function () {
        if (this.swalRef) {
            this.swalRef.destroy();
        }
    };
    SwalDirective.prototype.onHostClicked = function (event) {
        var _this = this;
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        if (this.swalOptions) {
            this.swalInstance.options = this.swalOptions;
        }
        var confirmSub = this.swalInstance.confirm.asObservable().subscribe(function (v) { return _this.confirm.emit(v); });
        var cancelSub = this.swalInstance.cancel.asObservable().subscribe(function (v) { return _this.cancel.emit(v); });
        this.swalInstance.show().then(unsubscribe);
        function unsubscribe() {
            confirmSub.unsubscribe();
            cancelSub.unsubscribe();
        }
    };
    return SwalDirective;
}());
SwalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[swal]'
            },] },
];
SwalDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
SwalDirective.propDecorators = {
    "swal": [{ type: Input },],
    "confirm": [{ type: Output },],
    "cancel": [{ type: Output },],
    "onHostClicked": [{ type: HostListener, args: ['click', ['$event'],] },],
};
var SwalPartialComponent = /** @class */ (function () {
    function SwalPartialComponent() {
    }
    return SwalPartialComponent;
}());
SwalPartialComponent.decorators = [
    { type: Component, args: [{
                template: '<ng-container *ngTemplateOutlet="template"></ng-container>',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
SwalPartialComponent.ctorParameters = function () { return []; };
SwalPartialComponent.propDecorators = {
    "template": [{ type: Input },],
};
var SwalPartialDirective = /** @class */ (function () {
    function SwalPartialDirective(resolver, injector, app, templateRef, swalTargets, swalComponent) {
        this.resolver = resolver;
        this.injector = injector;
        this.app = app;
        this.templateRef = templateRef;
        this.swalTargets = swalTargets;
        this.swalComponent = swalComponent;
    }
    SwalPartialDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.beforeOpenSubscription = this.swalComponent.beforeOpen.asObservable().subscribe(function () {
            var targetEl = _this.swalPartial ? _this.swalPartial() : _this.swalTargets.content();
            var factory = _this.resolver.resolveComponentFactory(SwalPartialComponent);
            _this.partialRef = factory.create(_this.injector, [], targetEl);
            _this.partialRef.instance.template = _this.templateRef;
            _this.app.attachView(_this.partialRef.hostView);
        });
        this.closeSubscription = this.swalComponent.close.asObservable().subscribe(function () {
            _this.app.detachView(_this.partialRef.hostView);
            _this.partialRef.destroy();
        });
    };
    SwalPartialDirective.prototype.ngOnDestroy = function () {
        this.beforeOpenSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
    };
    return SwalPartialDirective;
}());
SwalPartialDirective.decorators = [
    { type: Directive, args: [{
                selector: '[swalPartial]'
            },] },
];
SwalPartialDirective.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: Injector, },
    { type: ApplicationRef, },
    { type: TemplateRef, },
    { type: SwalPartialTargets, },
    { type: SwalComponent, decorators: [{ type: Host },] },
]; };
SwalPartialDirective.propDecorators = {
    "swalPartial": [{ type: Input },],
};
var SweetAlert2Module = /** @class */ (function () {
    function SweetAlert2Module() {
    }
    SweetAlert2Module.forRoot = function (defaultSwalOptions) {
        return {
            ngModule: SweetAlert2Module,
            providers: [swalDefaultsProvider(defaultSwalOptions)]
        };
    };
    return SweetAlert2Module;
}());
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
SweetAlert2Module.ctorParameters = function () { return []; };

export { SwalPartialTargets, SwalComponent, SwalDirective, SwalPartialDirective, SweetAlert2Module, SwalDefaults as ɵa, swalDefaultsProvider as ɵb, SwalPartialComponent as ɵc };
//# sourceMappingURL=toverux-ngx-sweetalert2.js.map
