import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInventory } from 'app/shared/model/inventory.model';
import { InventoryService } from './inventory.service';
import { InventoryDeleteDialogComponent } from './inventory-delete-dialog.component';

@Component({
  selector: 'jhi-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit, OnDestroy {
  inventories?: IInventory[];
  eventSubscriber?: Subscription;

  constructor(protected inventoryService: InventoryService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.inventoryService.query().subscribe((res: HttpResponse<IInventory[]>) => (this.inventories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInventories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInventory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInventories(): void {
    this.eventSubscriber = this.eventManager.subscribe('inventoryListModification', () => this.loadAll());
  }

  delete(inventory: IInventory): void {
    const modalRef = this.modalService.open(InventoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inventory = inventory;
  }
}
