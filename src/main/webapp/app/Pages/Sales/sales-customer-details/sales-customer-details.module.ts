import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { SALES_CUSTOMER-DETAILS_ROUTE, SalesCustomerDetailsComponent } from './';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ SALES_CUSTOMER-DETAILS_ROUTE ], { useHash: true })
    ],
    declarations: [
      SalesCustomerDetailsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppSalesCustomerDetailsModule {}
