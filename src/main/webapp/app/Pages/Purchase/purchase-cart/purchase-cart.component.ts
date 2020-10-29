import {Component, OnInit} from '@angular/core';
import {BuyPopupComponent} from "app/Pages/Purchase/buy-popup/buy-popup.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InventoryService} from "app/Pages/Inventory/inventory/inventory.service";
import {IInventory, Inventory} from "app/shared/model/inventory.model";
import {HttpResponse} from "@angular/common/http";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {ROUTES} from "app/Constants/Routes";

@Component({
  selector: 'jhi-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: [
    'purchase-cart.component.scss'
  ]
})
export class PurchaseCartComponent implements OnInit {

  code: string;
  itemName: string;
  searchItems: IInventory[] = [];

  constructor(private modalService: NgbModal, protected inventoryService: InventoryService, public purchaseData: PurchaseData,public Routes:ROUTES) {
    this.code = '';
    this.itemName = '';
  }

  search(): void {
    if ((this.itemName === '' || this.itemName.length === 0) && (this.code === '' || this.code.length === 0)) {
      this.inventoryService.query().subscribe((res: HttpResponse<IInventory[]>) => (this.searchItems = res.body || []));
    } else if (this.itemName === '' || this.itemName.length === 0) {
      this.inventoryService.findAllByCode(this.code).subscribe((res: HttpResponse<IInventory[]>) => (this.searchItems = res.body || []));
    } else if (this.code === '' || this.code.length === 0) {
      this.inventoryService.findAllByName(this.itemName).subscribe((res: HttpResponse<IInventory[]>) => (this.searchItems = res.body || []));
    } else {
      this.inventoryService.findAllByCodeAndName(this.code, this.itemName).subscribe((res: HttpResponse<IInventory[]>) => (this.searchItems = res.body || []));
    }
  }

  ngOnInit(): void {

  }

  addToCart(item: IInventory): void {
    this.modalService.open(BuyPopupComponent);
    this.purchaseData.add(item);
  }


}
