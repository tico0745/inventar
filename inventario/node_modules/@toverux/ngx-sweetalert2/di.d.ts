import { InjectionToken, Provider } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
export declare const SwalDefaults: InjectionToken<SweetAlertOptions>;
export declare function swalDefaultsProvider(options?: SweetAlertOptions): Provider;
