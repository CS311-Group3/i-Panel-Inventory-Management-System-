import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReturnItems } from 'app/shared/model/return-items.model';
import { ReturnItemsService } from './return-items.service';
import { ReturnItemsDeleteDialogComponent } from './return-items-delete-dialog.component';

@Component({
  selector: 'jhi-return-items',
  templateUrl: './return-items.component.html',
})
export class ReturnItemsComponent implements OnInit, OnDestroy {
  returnItems?: IReturnItems[];
  eventSubscriber?: Subscription;

  constructor(
    protected returnItemsService: ReturnItemsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.returnItemsService.query().subscribe((res: HttpResponse<IReturnItems[]>) => (this.returnItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReturnItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReturnItems): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReturnItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('returnItemsListModification', () => this.loadAll());
  }

  delete(returnItems: IReturnItems): void {
    const modalRef = this.modalService.open(ReturnItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.returnItems = returnItems;
  }
}
