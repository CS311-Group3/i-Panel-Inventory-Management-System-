import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReturnItems } from 'app/shared/model/return-items.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReturnItemsService } from './return-items.service';
import { ReturnItemsDeleteDialogComponent } from './return-items-delete-dialog.component';

@Component({
  selector: 'jhi-return-items',
  templateUrl: './return-items.component.html',
})
export class ReturnItemsComponent implements OnInit, OnDestroy {
  returnItems: IReturnItems[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected returnItemsService: ReturnItemsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.returnItems = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.returnItemsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IReturnItems[]>) => this.paginateReturnItems(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.returnItems = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('returnItemsListModification', () => this.reset());
  }

  delete(returnItems: IReturnItems): void {
    const modalRef = this.modalService.open(ReturnItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.returnItems = returnItems;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateReturnItems(data: IReturnItems[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.returnItems.push(data[i]);
      }
    }
  }
}
