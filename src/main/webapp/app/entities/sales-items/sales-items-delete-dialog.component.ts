import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISalesItems } from 'app/shared/model/sales-items.model';
import { SalesItemsService } from './sales-items.service';

@Component({
  templateUrl: './sales-items-delete-dialog.component.html',
})
export class SalesItemsDeleteDialogComponent {
  salesItems?: ISalesItems;

  constructor(
    protected salesItemsService: SalesItemsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.salesItemsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('salesItemsListModification');
      this.activeModal.close();
    });
  }
}
