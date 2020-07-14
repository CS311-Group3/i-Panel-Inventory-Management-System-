import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpanelSharedModule } from 'app/shared/shared.module';
import { PurchasesComponent } from './purchases.component';
import { PurchasesDetailComponent } from './purchases-detail.component';
import { PurchasesUpdateComponent } from './purchases-update.component';
import { PurchasesDeleteDialogComponent } from './purchases-delete-dialog.component';
import { purchasesRoute } from './purchases.route';

@NgModule({
  imports: [IpanelSharedModule, RouterModule.forChild(purchasesRoute)],
  declarations: [PurchasesComponent, PurchasesDetailComponent, PurchasesUpdateComponent, PurchasesDeleteDialogComponent],
  entryComponents: [PurchasesDeleteDialogComponent],
})
export class IpanelPurchasesModule {}
