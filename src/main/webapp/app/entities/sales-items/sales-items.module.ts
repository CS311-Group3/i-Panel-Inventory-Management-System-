import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from 'app/shared/shared.module';
import { SalesItemsComponent } from './sales-items.component';
import { SalesItemsDetailComponent } from './sales-items-detail.component';
import { SalesItemsUpdateComponent } from './sales-items-update.component';
import { SalesItemsDeleteDialogComponent } from './sales-items-delete-dialog.component';
import { salesItemsRoute } from './sales-items.route';

@NgModule({
  imports: [IpanelSharedModule, RouterModule.forChild(salesItemsRoute)],
  declarations: [SalesItemsComponent, SalesItemsDetailComponent, SalesItemsUpdateComponent, SalesItemsDeleteDialogComponent],
  entryComponents: [SalesItemsDeleteDialogComponent],
})
export class IpanelSalesItemsModule {}
