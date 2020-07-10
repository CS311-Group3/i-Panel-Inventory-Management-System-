import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from 'app/shared/shared.module';
import { PurchaseItemsComponent } from './purchase-items.component';
import { PurchaseItemsDetailComponent } from './purchase-items-detail.component';
import { PurchaseItemsUpdateComponent } from './purchase-items-update.component';
import { PurchaseItemsDeleteDialogComponent } from './purchase-items-delete-dialog.component';
import { purchaseItemsRoute } from './purchase-items.route';

@NgModule({
  imports: [IpanelSharedModule, RouterModule.forChild(purchaseItemsRoute)],
  declarations: [PurchaseItemsComponent, PurchaseItemsDetailComponent, PurchaseItemsUpdateComponent, PurchaseItemsDeleteDialogComponent],
  entryComponents: [PurchaseItemsDeleteDialogComponent],
})
export class IpanelPurchaseItemsModule {}
