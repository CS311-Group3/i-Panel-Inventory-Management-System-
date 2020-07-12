import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from '../shared/shared.module';

import { CREATE_USER_ROUTE, CreateUserComponent } from './';

@NgModule({
    imports: [
      IpanelSharedModule,
      RouterModule.forRoot([ CREATE_USER_ROUTE ], { useHash: true })
    ],
    declarations: [
      CreateUserComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IpanelAppCreateUserModule {}
