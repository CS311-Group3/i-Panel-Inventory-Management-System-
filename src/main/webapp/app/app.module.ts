import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { IpanelSharedModule } from 'app/shared/shared.module';
import { IpanelCoreModule } from 'app/core/core.module';
import { IpanelAppRoutingModule } from './app-routing.module';
import { IpanelHomeModule } from './Pages/home/home.module';
import { IpanelEntityModule } from './entities/entity.module';
import { IpanelAppPurchaseCartModule } from 'app/Pages/Purchase/purchase-cart';
import { IpanelAppPurchaseCheckoutModule } from 'app/Pages/Purchase/purchase-checkout';
import { IpanelAppSalesCartModule } from 'app/Pages/Sales/sales-cart';
import { IpanelAppSalesCheckoutModule } from 'app/Pages/Sales/sales-checkout';
import { IpanelAppReturnsCartModule } from 'app/Pages/Returns/returns-cart';
import { IpanelAppReturnsCheckoutModule } from 'app/Pages/Returns/returns-checkout';
import { IpanelAppNotificationsModule } from 'app/Pages/Notifications/notifications';
import { IpanelAppSalesMenuModule } from 'app/Pages/Sales/sales-menu';
import { IpanelAppPurchaseMenuModule } from 'app/Pages/Purchase/purchase-menu';
import { IpanelAppReturnsMenuModule } from 'app/Pages/Returns/returns-menu';
import { IpanelAppAdminMenuModule } from 'app/Pages/AdminDashboard/admin-menu';
import { IpanelAppViewUsersModule } from 'app/Pages/AdminDashboard/view-users';
import { IpanelAppCreateUserModule } from 'app/Pages/AdminDashboard/create-user';
import { IpanelAppSystemStatsModule } from 'app/Pages/AdminDashboard/system-stats';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import {SidebarComponent} from "app/layouts/sidebar/sidebar.component";
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { BuyPopupComponent } from "app/Pages/Purchase/buy-popup/buy-popup.component";
import {ReturnPopupComponent} from "app/Pages/Returns/returns-popup/return-popup.component";
import {SalesPopupComponent} from "app/Pages/Sales/sales-popup/sales-popup.component";

@NgModule({
  imports: [
    BrowserModule,
    IpanelSharedModule,
    IpanelCoreModule,
    IpanelHomeModule,
    IpanelAppPurchaseCartModule,
    IpanelAppPurchaseCheckoutModule,
    IpanelAppSalesCartModule,
    IpanelAppSalesCheckoutModule,
    IpanelAppReturnsCartModule,
    IpanelAppReturnsCheckoutModule,
    IpanelAppNotificationsModule,
    IpanelAppSalesMenuModule,
    IpanelAppPurchaseMenuModule,
    IpanelAppReturnsMenuModule,
    IpanelAppAdminMenuModule,
    IpanelAppViewUsersModule,
    IpanelAppCreateUserModule,
    IpanelAppSystemStatsModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    IpanelEntityModule,
    IpanelAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, BuyPopupComponent,ReturnPopupComponent,SalesPopupComponent,SidebarComponent],
  bootstrap: [MainComponent]
})
export class IpanelAppModule {}
