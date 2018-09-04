import { ApplicationRef, ComponentFactoryResolver, Injector, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SwalPartialTargets } from './swal-partial-targets';
import { SwalComponent } from './swal.component';
/**
 * A structural directive that lets you use Angular templates inside of Sweet Alerts.
 * There are different targetable zones in a Sweet Alert: title, content, confirmButton, cancelButton, buttonsWrapper.
 * The default target is the content zone.
 *
 * Usage in your component's TypeScript code-behind (if you use another target than "content"):
 *
 *     @Component({ ... })
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
export declare class SwalPartialDirective implements OnInit, OnDestroy {
    private readonly resolver;
    private readonly injector;
    private readonly app;
    private readonly templateRef;
    private readonly swalTargets;
    private readonly swalComponent;
    /**
     * Takes a "partial target" or nothing (will target main content zone by default).
     *
     * See the {@link SwalPartialTargets} service to see the available targets.
     * See the class doc block for more informations.
     */
    swalPartial: () => HTMLElement;
    /**
     * Holds the component reference of the controlled SwalPartialComponent to destroy it when no longer needed.
     */
    private partialRef;
    private beforeOpenSubscription;
    private closeSubscription;
    constructor(resolver: ComponentFactoryResolver, injector: Injector, app: ApplicationRef, templateRef: TemplateRef<any>, swalTargets: SwalPartialTargets, swalComponent: SwalComponent);
    /**
     * Subscribes to the the Sweet Alert appearance/disappearance to create/destroy the SwalPartialComponent that will
     * receive the consumer's template.
     */
    ngOnInit(): void;
    /**
     * Unsubscribes from the Sweet Alert appearance/disappearance.
     */
    ngOnDestroy(): void;
}
