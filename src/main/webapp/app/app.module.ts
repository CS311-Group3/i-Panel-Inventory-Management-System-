import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { IpanelSharedModule } from 'app/shared/shared.module';
import { IpanelCoreModule } from 'app/core/core.module';
import { IpanelAppRoutingModule } from './app-routing.module';
import { IpanelHomeModule } from './Pages/home/home.module';
import { IpanelEntityModule } from './entities/entity.module';
import { IpanelAppLoginPageModule } from './Pages/Login/login-page/login-page.module';
import { IpanelAppPurchaseCartModule } from './Pages/Purchase/purchase-cart/purchase-cart.module';
import { IpanelAppPurchaseCheckoutModule } from './Pages/Purchase/purchase-checkout/purchase-checkout.module';
import { IpanelAppSalesCartModule } from './Pages/Sales/sales-cart/sales-cart.module';
import { IpanelAppSalesCheckoutModule } from './Pages/Sales/sales-checkout/sales-checkout.module';
import { IpanelAppReturnsCartModule } from './Pages/Returns/returns-cart/returns-cart.module';
import { IpanelAppReturnsCheckoutModule } from './Pages/Returns/returns-checkout/returns-checkout.module';
import { IpanelAppNotificationsModule } from './Pages/Notifications/notifications/notifications.module';
import { IpanelAppSalesMenuModule } from './Pages/Sales/sales-menu/sales-menu.module';
import { IpanelAppPurchaseMenuModule } from './Pages/Purchase/purchase-menu/purchase-menu.module';
import { IpanelAppReturnsMenuModule } from './Pages/Returns/returns-menu/returns-menu.module';
import { IpanelAppAdminMenuModule } from './Pages/AdminDashboard/admin-menu/admin-menu.module';
import { IpanelAppViewUsersModule } from './Pages/AdminDashboard/view-users/view-users.module';
import { IpanelAppCreateUserModule } from './Pages/AdminDashboard/create-user/create-user.module';
import { IpanelAppSystemStatsModule } from './Pages/AdminDashboard/system-stats/system-stats.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
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
    IpanelAppLoginPageModule,
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
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, BuyPopupComponent,ReturnPopupComponent,SalesPopupComponent],
  bootstrap: [MainComponent]
})
export class IpanelAppModule {}
