import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseItems } from 'app/shared/model/purchase-items.model';
import { PurchaseItemsService } from './purchase-items.service';
import { PurchaseItemsDeleteDialogComponent } from './purchase-items-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-items',
  templateUrl: './purchase-items.component.html',
})
export class PurchaseItemsComponent implements OnInit, OnDestroy {
  purchaseItems?: IPurchaseItems[];
  eventSubscriber?: Subscription;

  constructor(
    protected purchaseItemsService: PurchaseItemsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.purchaseItemsService.query().subscribe((res: HttpResponse<IPurchaseItems[]>) => (this.purchaseItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchaseItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchaseItems): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchaseItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseItemsListModification', () => this.loadAll());
  }

  delete(purchaseItems: IPurchaseItems): void {
    const modalRef = this.modalService.open(PurchaseItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseItems = purchaseItems;
  }
}
