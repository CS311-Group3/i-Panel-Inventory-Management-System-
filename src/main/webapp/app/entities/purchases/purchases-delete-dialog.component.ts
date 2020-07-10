import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchases } from 'app/shared/model/purchases.model';
import { PurchasesService } from './purchases.service';

@Component({
  templateUrl: './purchases-delete-dialog.component.html',
})
export class PurchasesDeleteDialogComponent {
  purchases?: IPurchases;

  constructor(protected purchasesService: PurchasesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchasesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchasesListModification');
      this.activeModal.close();
    });
  }
}
