import {Component, OnInit} from '@angular/core';
import {BuyPopupComponent} from "app/Pages/Purchase/buy-popup/buy-popup.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseItemsService} from "app/entities/purchase-items/purchase-items.service";
import {InventoryService} from "app/entities/inventory/inventory.service";
import {IInventory, Inventory} from "app/shared/model/inventory.model";
import {HttpResponse} from "@angular/common/http";
import {PurchaseService} from "app/Pages/Purchase/purchase.service";

@Component({
  selector: 'jhi-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: [
    'purchase-cart.component.scss'
  ]
})
export class PurchaseCartComponent implements OnInit {
  itemcode: string;
  message: string;

  pop?:BuyPopupComponent;
  inventoryItems?: IInventory[] = [];

  constructor(private modalService: NgbModal, protected purchaseItemsService: PurchaseItemsService, protected inventoryService: InventoryService, protected purchaseService: PurchaseService) {
    this.message = 'PurchaseCartComponent message';
    this.itemcode = "";
  }


  ngOnInit(): void {
  }

  addToCart(item: IInventory): void {
    this.purchaseService.selectedItem = item;
    const modalRef = this.modalService.open(this.pop);


  }

  public getItemsByItemCode(id: string): void {
    this.inventoryService.getInventoryByItemCode(id).subscribe((res: HttpResponse<IInventory[]>) => (this.inventoryItems = res.body || []));
  }

  // public getItemsByItemCode(): void {
  //   this.inventoryService.query().subscribe((res: HttpResponse<IInventory[]>) => (this.inventoryItems = res.body || []));
  // }

}
