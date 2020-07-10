import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISales } from 'app/shared/model/sales.model';
import { SalesService } from './sales.service';
import { SalesDeleteDialogComponent } from './sales-delete-dialog.component';

@Component({
  selector: 'jhi-sales',
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit, OnDestroy {
  sales?: ISales[];
  eventSubscriber?: Subscription;

  constructor(protected salesService: SalesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.salesService.query().subscribe((res: HttpResponse<ISales[]>) => (this.sales = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSales();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISales): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSales(): void {
    this.eventSubscriber = this.eventManager.subscribe('salesListModification', () => this.loadAll());
  }

  delete(sales: ISales): void {
    const modalRef = this.modalService.open(SalesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sales = sales;
  }
}
