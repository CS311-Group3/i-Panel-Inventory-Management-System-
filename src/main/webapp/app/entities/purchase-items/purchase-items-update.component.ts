import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPurchaseItems, PurchaseItems } from 'app/shared/model/purchase-items.model';
import { PurchaseItemsService } from './purchase-items.service';
import { IInventory } from 'app/shared/model/inventory.model';
import { InventoryService } from 'app/entities/inventory/inventory.service';
import { IPurchases } from 'app/shared/model/purchases.model';
import { PurchasesService } from 'app/entities/purchases/purchases.service';

type SelectableEntity = IInventory | IPurchases;

@Component({
  selector: 'jhi-purchase-items-update',
  templateUrl: './purchase-items-update.component.html',
})
export class PurchaseItemsUpdateComponent implements OnInit {
  isSaving = false;
  inventories: IInventory[] = [];
  purchases: IPurchases[] = [];

  editForm = this.fb.group({
    id: [],
    unitPrice: [],
    quantity: [],
    total: [],
    itemCode: [],
    purchaseCode: [],
  });

  constructor(
    protected purchaseItemsService: PurchaseItemsService,
    protected inventoryService: InventoryService,
    protected purchasesService: PurchasesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseItems }) => {
      this.updateForm(purchaseItems);

      this.inventoryService.query().subscribe((res: HttpResponse<IInventory[]>) => (this.inventories = res.body || []));

      this.purchasesService.query().subscribe((res: HttpResponse<IPurchases[]>) => (this.purchases = res.body || []));
    });
  }

  updateForm(purchaseItems: IPurchaseItems): void {
    this.editForm.patchValue({
      id: purchaseItems.id,
      unitPrice: purchaseItems.unitPrice,
      quantity: purchaseItems.quantity,
      total: purchaseItems.total,
      itemCode: purchaseItems.itemCode,
      purchaseCode: purchaseItems.purchaseCode,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchaseItems = this.createFromForm();
    if (purchaseItems.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseItemsService.update(purchaseItems));
    } else {
      this.subscribeToSaveResponse(this.purchaseItemsService.create(purchaseItems));
    }
  }

  private createFromForm(): IPurchaseItems {
    return {
      ...new PurchaseItems(),
      id: this.editForm.get(['id'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      total: this.editForm.get(['total'])!.value,
      itemCode: this.editForm.get(['itemCode'])!.value,
      purchaseCode: this.editForm.get(['purchaseCode'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseItems>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
