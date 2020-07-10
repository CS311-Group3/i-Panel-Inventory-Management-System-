import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalesItems } from 'app/shared/model/sales-items.model';
import { SalesItemsService } from './sales-items.service';
import { SalesItemsDeleteDialogComponent } from './sales-items-delete-dialog.component';

@Component({
  selector: 'jhi-sales-items',
  templateUrl: './sales-items.component.html',
})
export class SalesItemsComponent implements OnInit, OnDestroy {
  salesItems?: ISalesItems[];
  eventSubscriber?: Subscription;

  constructor(protected salesItemsService: SalesItemsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.salesItemsService.query().subscribe((res: HttpResponse<ISalesItems[]>) => (this.salesItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSalesItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISalesItems): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSalesItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('salesItemsListModification', () => this.loadAll());
  }

  delete(salesItems: ISalesItems): void {
    const modalRef = this.modalService.open(SalesItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.salesItems = salesItems;
  }
}
