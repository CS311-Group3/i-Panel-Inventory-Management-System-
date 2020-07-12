import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { INVENTORY_VIEW_ROUTE, InventoryViewComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ INVENTORY_VIEW_ROUTE ], { useHash: true })
    ],
    declarations: [
      InventoryViewComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppInventoryViewModule {}
