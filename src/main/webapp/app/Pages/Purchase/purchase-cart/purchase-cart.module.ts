import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { PURCHASE_CART_ROUTE, PurchaseCartComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ PURCHASE_CART_ROUTE ], { useHash: true })
    ],
    declarations: [
      PurchaseCartComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppPurchaseCartModule {}
