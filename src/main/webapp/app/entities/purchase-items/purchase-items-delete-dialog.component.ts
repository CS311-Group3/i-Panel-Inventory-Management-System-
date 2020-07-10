import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseItems } from 'app/shared/model/purchase-items.model';
import { PurchaseItemsService } from './purchase-items.service';

@Component({
  templateUrl: './purchase-items-delete-dialog.component.html',
})
export class PurchaseItemsDeleteDialogComponent {
  purchaseItems?: IPurchaseItems;

  constructor(
    protected purchaseItemsService: PurchaseItemsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseItemsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseItemsListModification');
      this.activeModal.close();
    });
  }
}
