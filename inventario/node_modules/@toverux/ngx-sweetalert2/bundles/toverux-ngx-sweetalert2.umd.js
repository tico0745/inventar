(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('sweetalert2'), require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@toverux/ngx-sweetalert2', ['exports', 'sweetalert2', '@angular/core', '@angular/common'], factory) :
	(factory((global.toverux = global.toverux || {}, global.toverux['ngx-sweetalert2'] = {}),global.swal,global.ng.core,global.ng.common));
}(this, (function (exports,swal,core,common) { 'use strict';

swal = swal && swal.hasOwnProperty('default') ? swal['default'] : swal;

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
var SwalDefaults = new core.InjectionToken('SwalDefaults');
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
        this.beforeOpen = new core.EventEmitter();
        this.open = new core.EventEmitter();
        this.close = new core.EventEmitter();
        this.confirm = new core.EventEmitter();
        this.cancel = new core.EventEmitter();
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
    { type: core.Component, args: [{
                selector: 'swal',
                template: '',
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
SwalComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [SwalDefaults,] },] },
]; };
SwalComponent.propDecorators = {
    "title": [{ type: core.Input },],
    "titleText": [{ type: core.Input },],
    "text": [{ type: core.Input },],
    "html": [{ type: core.Input },],
    "footer": [{ type: core.Input },],
    "type": [{ type: core.Input },],
    "backdrop": [{ type: core.Input },],
    "toast": [{ type: core.Input },],
    "target": [{ type: core.Input },],
    "input": [{ type: core.Input },],
    "width": [{ type: core.Input },],
    "padding": [{ type: core.Input },],
    "background": [{ type: core.Input },],
    "position": [{ type: core.Input },],
    "grow": [{ type: core.Input },],
    "customClass": [{ type: core.Input },],
    "timer": [{ type: core.Input },],
    "animation": [{ type: core.Input },],
    "allowOutsideClick": [{ type: core.Input },],
    "allowEscapeKey": [{ type: core.Input },],
    "allowEnterKey": [{ type: core.Input },],
    "showConfirmButton": [{ type: core.Input },],
    "showCancelButton": [{ type: core.Input },],
    "confirmButtonText": [{ type: core.Input },],
    "cancelButtonText": [{ type: core.Input },],
    "confirmButtonColor": [{ type: core.Input },],
    "cancelButtonColor": [{ type: core.Input },],
    "confirmButtonClass": [{ type: core.Input },],
    "cancelButtonClass": [{ type: core.Input },],
    "confirmButtonAriaLabel": [{ type: core.Input },],
    "cancelButtonAriaLabel": [{ type: core.Input },],
    "buttonsStyling": [{ type: core.Input },],
    "reverseButtons": [{ type: core.Input },],
    "focusConfirm": [{ type: core.Input },],
    "focusCancel": [{ type: core.Input },],
    "showCloseButton": [{ type: core.Input },],
    "closeButtonAriaLabel": [{ type: core.Input },],
    "showLoaderOnConfirm": [{ type: core.Input },],
    "preConfirm": [{ type: core.Input },],
    "imageUrl": [{ type: core.Input },],
    "imageWidth": [{ type: core.Input },],
    "imageHeight": [{ type: core.Input },],
    "imageAlt": [{ type: core.Input },],
    "imageClass": [{ type: core.Input },],
    "inputPlaceholder": [{ type: core.Input },],
    "inputValue": [{ type: core.Input },],
    "inputOptions": [{ type: core.Input },],
    "inputAutoTrim": [{ type: core.Input },],
    "inputAttributes": [{ type: core.Input },],
    "inputValidator": [{ type: core.Input },],
    "inputClass": [{ type: core.Input },],
    "progressSteps": [{ type: core.Input },],
    "currentProgressStep": [{ type: core.Input },],
    "progressStepsDistance": [{ type: core.Input },],
    "beforeOpen": [{ type: core.Output },],
    "open": [{ type: core.Output },],
    "close": [{ type: core.Output },],
    "confirm": [{ type: core.Output },],
    "cancel": [{ type: core.Output },],
    "options": [{ type: core.Input },],
};
var SwalDirective = /** @class */ (function () {
    function SwalDirective(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.confirm = new core.EventEmitter();
        this.cancel = new core.EventEmitter();
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
    { type: core.Directive, args: [{
                selector: '[swal]'
            },] },
];
SwalDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.ComponentFactoryResolver, },
]; };
SwalDirective.propDecorators = {
    "swal": [{ type: core.Input },],
    "confirm": [{ type: core.Output },],
    "cancel": [{ type: core.Output },],
    "onHostClicked": [{ type: core.HostListener, args: ['click', ['$event'],] },],
};
var SwalPartialComponent = /** @class */ (function () {
    function SwalPartialComponent() {
    }
    return SwalPartialComponent;
}());
SwalPartialComponent.decorators = [
    { type: core.Component, args: [{
                template: '<ng-container *ngTemplateOutlet="template"></ng-container>',
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
SwalPartialComponent.ctorParameters = function () { return []; };
SwalPartialComponent.propDecorators = {
    "template": [{ type: core.Input },],
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
    { type: core.Directive, args: [{
                selector: '[swalPartial]'
            },] },
];
SwalPartialDirective.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
    { type: core.Injector, },
    { type: core.ApplicationRef, },
    { type: core.TemplateRef, },
    { type: SwalPartialTargets, },
    { type: SwalComponent, decorators: [{ type: core.Host },] },
]; };
SwalPartialDirective.propDecorators = {
    "swalPartial": [{ type: core.Input },],
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
    { type: core.NgModule, args: [{
                declarations: [
                    SwalComponent, SwalPartialDirective, SwalPartialComponent,
                    SwalDirective
                ],
                providers: [
                    SwalPartialTargets
                ],
                imports: [
                    common.CommonModule
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

exports.SwalPartialTargets = SwalPartialTargets;
exports.SwalComponent = SwalComponent;
exports.SwalDirective = SwalDirective;
exports.SwalPartialDirective = SwalPartialDirective;
exports.SweetAlert2Module = SweetAlert2Module;
exports.ɵa = SwalDefaults;
exports.ɵb = swalDefaultsProvider;
exports.ɵc = SwalPartialComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=toverux-ngx-sweetalert2.umd.js.map
