import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from 'app/shared/shared.module';
import { ReturnItemsComponent } from './return-items.component';
import { ReturnItemsDetailComponent } from './return-items-detail.component';
import { ReturnItemsUpdateComponent } from './return-items-update.component';
import { ReturnItemsDeleteDialogComponent } from './return-items-delete-dialog.component';
import { returnItemsRoute } from './return-items.route';

@NgModule({
  imports: [IpanelSharedModule, RouterModule.forChild(returnItemsRoute)],
  declarations: [ReturnItemsComponent, ReturnItemsDetailComponent, ReturnItemsUpdateComponent, ReturnItemsDeleteDialogComponent],
  entryComponents: [ReturnItemsDeleteDialogComponent],
})
export class IpanelReturnItemsModule {}
