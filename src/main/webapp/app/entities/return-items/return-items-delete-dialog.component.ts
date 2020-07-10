import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReturnItems } from 'app/shared/model/return-items.model';
import { ReturnItemsService } from './return-items.service';

@Component({
  templateUrl: './return-items-delete-dialog.component.html',
})
export class ReturnItemsDeleteDialogComponent {
  returnItems?: IReturnItems;

  constructor(
    protected returnItemsService: ReturnItemsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.returnItemsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('returnItemsListModification');
      this.activeModal.close();
    });
  }
}
