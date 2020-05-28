import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { PURCHASE_CHECKOUT_ROUTE, PurchaseCheckoutComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ PURCHASE_CHECKOUT_ROUTE ], { useHash: true })
    ],
    declarations: [
      PurchaseCheckoutComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppPurchaseCheckoutModule {}
