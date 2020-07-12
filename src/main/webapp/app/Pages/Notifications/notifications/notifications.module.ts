import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../../../shared/shared.module';

import { NOTIFICATIONS_ROUTE, NotificationsComponent } from './index';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ NOTIFICATIONS_ROUTE ], { useHash: true })
    ],
    declarations: [
      NotificationsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppNotificationsModule {}
