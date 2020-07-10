import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchases } from 'app/shared/model/purchases.model';
import { PurchasesService } from './purchases.service';
import { PurchasesDeleteDialogComponent } from './purchases-delete-dialog.component';

@Component({
  selector: 'jhi-purchases',
  templateUrl: './purchases.component.html',
})
export class PurchasesComponent implements OnInit, OnDestroy {
  purchases?: IPurchases[];
  eventSubscriber?: Subscription;

  constructor(protected purchasesService: PurchasesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.purchasesService.query().subscribe((res: HttpResponse<IPurchases[]>) => (this.purchases = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchases): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchases(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchasesListModification', () => this.loadAll());
  }

  delete(purchases: IPurchases): void {
    const modalRef = this.modalService.open(PurchasesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchases = purchases;
  }
}
