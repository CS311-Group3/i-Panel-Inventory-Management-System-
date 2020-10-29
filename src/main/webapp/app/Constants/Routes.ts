import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ROUTES {
  public PURCHASE_MENU = "/purchase-menu";
  public PURCHASE_CART = "/purchase-cart";
  public PURCHASE_CHECKOUT = "/purchase-checkout";
  public PURCHASE_DETAILS = "/purchases";
  public ADD_VENDOR = "/vendor/new";

  public SALES_MENU = "/sales-menu";
  public SALES_CART = "/sales-cart";
  public SALES_CHECKOUT = "/sales-checkout";
  public SALES_DETAILS = "/sales-details";

  public RETURNS_MENU = "/returns-menu";
  public RETURNS_CART = "/returns-cart";
  public RETURNS_DETAILS = "/returns-data";

  public INVENTORY = "/inventory";

  public ADMIN_MENU = "/admin-menu";

  public HOME = "";


}
