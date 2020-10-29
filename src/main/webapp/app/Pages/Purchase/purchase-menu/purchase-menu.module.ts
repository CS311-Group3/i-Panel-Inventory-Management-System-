import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from 'app/shared/shared.module';

import { PURCHASE_MENU_ROUTE, PurchaseMenuComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ PURCHASE_MENU_ROUTE ], { useHash: true })
    ],
    declarations: [
      PurchaseMenuComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppPurchaseMenuModule {}
