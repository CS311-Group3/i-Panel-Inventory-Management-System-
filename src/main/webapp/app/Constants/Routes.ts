import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ROUTES {
  public PURCHASE_MENU = "app/Pages/Sales/sales-menu";
  public PURCHASE_CART = "Pages/purchase-cart";
  public PURCHASE_CHECKOUT = "Pages/purchase-checkout";
  public PURCHASE_DETAILS = "Pages/purchase-details";

  public VENDOR = "Pages/purchase-cart";

  public SALES_MENU = "Pages/sales-menu";
  public SALES_CART = "Pages/sales-cart";
  public SALES_CHECKOUT = "Pages/sales-checkout";
  public SALES_DETAILS = "Pages/sales-details";

  public RETURNS_MENU = "Pages/returns-menu";


  public ADMIN_MENU = "Pages/admin-menu";


}
