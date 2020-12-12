import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IPurchases} from 'app/shared/model/purchases.model';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {PurchasesService} from './purchases.service';
import {PurchasesDeleteDialogComponent} from './purchases-delete-dialog.component';
import {NavigationEnd, Router} from "@angular/router";
import {ROLES} from "app/Constants/Roles";

@Component({
  selector: 'jhi-purchases',
  templateUrl: './purchases.component.html',
})
export class PurchasesComponent implements OnInit, OnDestroy {
  purchases: IPurchases[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  date: string;


  constructor(
      protected purchasesService: PurchasesService,
      protected eventManager: JhiEventManager,
      protected modalService: NgbModal,
      protected parseLinks: JhiParseLinks,
      protected router: Router,
      public ROLE:ROLES
    ) {
      this.purchases = [];
      this.itemsPerPage = ITEMS_PER_PAGE;
      this.page = 0;
      this.links = {
        last: 0,
    };
    this.predicate = 'dateOfPurchase,id';
    this.ascending = false;
    this.date = '';
  }

  loadAll(): void {
    this.purchasesService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IPurchases[]>) => this.paginatePurchases(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.purchases = [];
    this.loadAll();

  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('purchasesListModification', () => this.reset());
  }

  delete(purchases: IPurchases): void {
    const modalRef = this.modalService.open(PurchasesDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.purchases = purchases;
  }

  getPurchases(): void {
    this.purchases = [];
    if (this.date === '') {
      this.loadAll();
    } else {
      this.getPurchasesByDate(this.date);
    }
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  getPurchasesByDate(date: string): void {
    this.purchasesService.getPurchasesByDate(date).subscribe((res: HttpResponse<IPurchases[]>) => (this.purchases = res.body || []));
  }

  protected paginatePurchases(data: IPurchases[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.purchases.push(data[i]);
      }
    }
  }


  searchByVendor(): void {

  }
}
