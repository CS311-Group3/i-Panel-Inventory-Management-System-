import {Component, OnInit} from '@angular/core';
import {BuyPopupComponent} from "app/Pages/Purchase/buy-popup/buy-popup.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InventoryService} from "app/entities/inventory/inventory.service";
import {IInventory} from "app/shared/model/inventory.model";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'jhi-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: [
    'purchase-cart.component.scss'
  ]
})
export class PurchaseCartComponent implements OnInit {

  code: string;
  items?:IInventory[] = [];

  constructor(private modalService:NgbModal,protected inventoryService:InventoryService) {
    this.code = '';
  }

  search(code:string):void{
    this.inventoryService.findAllByCode(code).subscribe((res: HttpResponse<IInventory[]>) => (this.items = res.body || []));
  }

  ngOnInit(): void {
  }

  addToCart():void {
    const modalRef = this.modalService.open(BuyPopupComponent);

  }

}
