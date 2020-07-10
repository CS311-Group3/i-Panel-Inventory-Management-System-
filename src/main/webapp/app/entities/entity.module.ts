import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'inventory',
        loadChildren: () => import('./inventory/inventory.module').then(m => m.IpanelInventoryModule),
      },
      {
        path: 'vendor',
        loadChildren: () => import('./vendor/vendor.module').then(m => m.IpanelVendorModule),
      },
      {
        path: 'purchases',
        loadChildren: () => import('./purchases/purchases.module').then(m => m.IpanelPurchasesModule),
      },
      {
        path: 'purchase-items',
        loadChildren: () => import('./purchase-items/purchase-items.module').then(m => m.IpanelPurchaseItemsModule),
      },
      {
        path: 'customer-details',
        loadChildren: () => import('./customer-details/customer-details.module').then(m => m.IpanelCustomerDetailsModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.IpanelSalesModule),
      },
      {
        path: 'sales-items',
        loadChildren: () => import('./sales-items/sales-items.module').then(m => m.IpanelSalesItemsModule),
      },
      {
        path: 'returns-data',
        loadChildren: () => import('./returns-data/returns-data.module').then(m => m.IpanelReturnsDataModule),
      },
      {
        path: 'return-items',
        loadChildren: () => import('./return-items/return-items.module').then(m => m.IpanelReturnItemsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class IpanelEntityModule {}
