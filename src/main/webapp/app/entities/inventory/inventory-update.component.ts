import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInventory, Inventory } from 'app/shared/model/inventory.model';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'jhi-inventory-update',
  templateUrl: './inventory-update.component.html',
})
export class InventoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    itemCode: [],
    itemName: [],
    category: [],
    description: [],
    quantity: [],
    reorderLevel: [],
    sellingPrice: [],
    buyingPrice: [],
  });

  constructor(protected inventoryService: InventoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inventory }) => {
      this.updateForm(inventory);
    });
  }

  updateForm(inventory: IInventory): void {
    this.editForm.patchValue({
      id: inventory.id,
      itemCode: inventory.itemCode,
      itemName: inventory.itemName,
      category: inventory.category,
      description: inventory.description,
      quantity: inventory.quantity,
      reorderLevel: inventory.reorderLevel,
      sellingPrice: inventory.sellingPrice,
      buyingPrice: inventory.buyingPrice,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inventory = this.createFromForm();
    if (inventory.id !== undefined) {
      this.subscribeToSaveResponse(this.inventoryService.update(inventory));
    } else {
      this.subscribeToSaveResponse(this.inventoryService.create(inventory));
    }
  }

  private createFromForm(): IInventory {
    return {
      ...new Inventory(),
      id: this.editForm.get(['id'])!.value,
      itemCode: this.editForm.get(['itemCode'])!.value,
      itemName: this.editForm.get(['itemName'])!.value,
      category: this.editForm.get(['category'])!.value,
      description: this.editForm.get(['description'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      reorderLevel: this.editForm.get(['reorderLevel'])!.value,
      sellingPrice: this.editForm.get(['sellingPrice'])!.value,
      buyingPrice: this.editForm.get(['buyingPrice'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInventory>>): void {
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
}
