import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { CUSTOMER_DETAILS_ROUTE, CustomerDetailsComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ CUSTOMER_DETAILS_ROUTE ], { useHash: true })
    ],
    declarations: [
      CustomerDetailsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppCustomerDetailsModule {}
