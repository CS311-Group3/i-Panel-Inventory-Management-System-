import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { RETURNS_CHECKOUT_ROUTE, ReturnsCheckoutComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ RETURNS_CHECKOUT_ROUTE ], { useHash: true })
    ],
    declarations: [
      ReturnsCheckoutComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppReturnsCheckoutModule {}
