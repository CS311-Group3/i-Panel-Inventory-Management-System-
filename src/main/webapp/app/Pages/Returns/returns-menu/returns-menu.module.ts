import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { RETURNS_MENU_ROUTE, ReturnsMenuComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ RETURNS_MENU_ROUTE ], { useHash: true })
    ],
    declarations: [
      ReturnsMenuComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppReturnsMenuModule {}
