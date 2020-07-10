import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISalesItems, SalesItems } from 'app/shared/model/sales-items.model';
import { SalesItemsService } from './sales-items.service';
import { IInventory } from 'app/shared/model/inventory.model';
import { InventoryService } from 'app/entities/inventory/inventory.service';
import { ISales } from 'app/shared/model/sales.model';
import { SalesService } from 'app/entities/sales/sales.service';

type SelectableEntity = IInventory | ISales;

@Component({
  selector: 'jhi-sales-items-update',
  templateUrl: './sales-items-update.component.html',
})
export class SalesItemsUpdateComponent implements OnInit {
  isSaving = false;
  inventories: IInventory[] = [];
  sales: ISales[] = [];

  editForm = this.fb.group({
    id: [],
    unitPrice: [],
    quantity: [],
    total: [],
    itemCode: [],
    salesCode: [],
  });

  constructor(
    protected salesItemsService: SalesItemsService,
    protected inventoryService: InventoryService,
    protected salesService: SalesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ salesItems }) => {
      this.updateForm(salesItems);

      this.inventoryService.query().subscribe((res: HttpResponse<IInventory[]>) => (this.inventories = res.body || []));

      this.salesService.query().subscribe((res: HttpResponse<ISales[]>) => (this.sales = res.body || []));
    });
  }

  updateForm(salesItems: ISalesItems): void {
    this.editForm.patchValue({
      id: salesItems.id,
      unitPrice: salesItems.unitPrice,
      quantity: salesItems.quantity,
      total: salesItems.total,
      itemCode: salesItems.itemCode,
      salesCode: salesItems.salesCode,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const salesItems = this.createFromForm();
    if (salesItems.id !== undefined) {
      this.subscribeToSaveResponse(this.salesItemsService.update(salesItems));
    } else {
      this.subscribeToSaveResponse(this.salesItemsService.create(salesItems));
    }
  }

  private createFromForm(): ISalesItems {
    return {
      ...new SalesItems(),
      id: this.editForm.get(['id'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      total: this.editForm.get(['total'])!.value,
      itemCode: this.editForm.get(['itemCode'])!.value,
      salesCode: this.editForm.get(['salesCode'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISalesItems>>): void {
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
