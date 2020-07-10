import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReturnsData } from 'app/shared/model/returns-data.model';
import { ReturnsDataService } from './returns-data.service';
import { ReturnsDataDeleteDialogComponent } from './returns-data-delete-dialog.component';

@Component({
  selector: 'jhi-returns-data',
  templateUrl: './returns-data.component.html',
})
export class ReturnsDataComponent implements OnInit, OnDestroy {
  returnsData?: IReturnsData[];
  eventSubscriber?: Subscription;

  constructor(
    protected returnsDataService: ReturnsDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.returnsDataService.query().subscribe((res: HttpResponse<IReturnsData[]>) => (this.returnsData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReturnsData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReturnsData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReturnsData(): void {
    this.eventSubscriber = this.eventManager.subscribe('returnsDataListModification', () => this.loadAll());
  }

  delete(returnsData: IReturnsData): void {
    const modalRef = this.modalService.open(ReturnsDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.returnsData = returnsData;
  }
}
