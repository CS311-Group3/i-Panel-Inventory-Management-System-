import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVendor } from 'app/shared/model/vendor.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { VendorService } from './vendor.service';
import { VendorDeleteDialogComponent } from './vendor-delete-dialog.component';

@Component({
  selector: 'jhi-vendor',
  templateUrl: './vendor.component.html',
})
export class VendorComponent implements OnInit, OnDestroy {
  vendors: IVendor[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected vendorService: VendorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.vendors = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.vendorService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IVendor[]>) => this.paginateVendors(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.vendors = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVendors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVendor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVendors(): void {
    this.eventSubscriber = this.eventManager.subscribe('vendorListModification', () => this.reset());
  }

  delete(vendor: IVendor): void {
    const modalRef = this.modalService.open(VendorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vendor = vendor;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateVendors(data: IVendor[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.vendors.push(data[i]);
      }
    }
  }
}
