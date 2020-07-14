import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'inventory',
        loadChildren: () => import('../Pages/Inventory/inventory/inventory.module').then(m => m.IpanelInventoryModule),
      },
      {
        path: 'vendor',
        loadChildren: () => import('../Pages/Purchase/vendor/vendor.module').then(m => m.IpanelVendorModule),
      },
      {
        path: 'purchases',
        loadChildren: () => import('../Pages/Purchase/purchases-details/purchases.module').then(m => m.IpanelPurchasesModule),
      },
      {
        path: 'purchase-items',
        loadChildren: () => import('./purchase-items/purchase-items.module').then(m => m.IpanelPurchaseItemsModule),
      },
      {
        path: 'customer-details',
        loadChildren: () => import('../Pages/Sales/customer-details/customer-details.module').then(m => m.IpanelCustomerDetailsModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('../Pages/Sales/sales-details/sales.module').then(m => m.IpanelSalesModule),
      },
      {
        path: 'sales-items',
        loadChildren: () => import('./sales-items/sales-items.module').then(m => m.IpanelSalesItemsModule),
      },
      {
        path: 'returns-data',
        loadChildren: () => import('../Pages/Returns/returns-data/returns-data.module').then(m => m.IpanelReturnsDataModule),
      },
      {
        path: 'return-items',
        loadChildren: () => import('./return-items/return-items.module').then(m => m.IpanelReturnItemsModule),
      },
      {
        path: 'user-details',
        loadChildren: () => import('./user-details/user-details.module').then(m => m.IpanelUserDetailsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class IpanelEntityModule {}
