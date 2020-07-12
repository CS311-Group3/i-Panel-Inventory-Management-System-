import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalesItems } from 'app/shared/model/sales-items.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SalesItemsService } from './sales-items.service';
import { SalesItemsDeleteDialogComponent } from './sales-items-delete-dialog.component';

@Component({
  selector: 'jhi-sales-items',
  templateUrl: './sales-items.component.html',
})
export class SalesItemsComponent implements OnInit, OnDestroy {
  salesItems: ISalesItems[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected salesItemsService: SalesItemsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.salesItems = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.salesItemsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ISalesItems[]>) => this.paginateSalesItems(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.salesItems = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('salesItemsListModification', () => this.reset());
  }

  delete(salesItems: ISalesItems): void {
    const modalRef = this.modalService.open(SalesItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.salesItems = salesItems;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSalesItems(data: ISalesItems[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.salesItems.push(data[i]);
      }
    }
  }
}
