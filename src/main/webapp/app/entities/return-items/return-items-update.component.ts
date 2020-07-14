import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReturnItems, ReturnItems } from 'app/shared/model/return-items.model';
import { ReturnItemsService } from './return-items.service';
import { IInventory } from 'app/shared/model/inventory.model';
import { InventoryService } from 'app/Pages/Inventory/inventory/inventory.service';
import { IReturnsData } from 'app/shared/model/returns-data.model';
import { ReturnsDataService } from 'app/Pages/Returns/returns-data/returns-data.service';

type SelectableEntity = IInventory | IReturnsData;

@Component({
  selector: 'jhi-return-items-update',
  templateUrl: './return-items-update.component.html',
})
export class ReturnItemsUpdateComponent implements OnInit {
  isSaving = false;
  inventories: IInventory[] = [];
  returnsdata: IReturnsData[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    itemCode: [],
    returnCode: [],
  });

  constructor(
    protected returnItemsService: ReturnItemsService,
    protected inventoryService: InventoryService,
    protected returnsDataService: ReturnsDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ returnItems }) => {
      this.updateForm(returnItems);

      this.inventoryService.query().subscribe((res: HttpResponse<IInventory[]>) => (this.inventories = res.body || []));

      this.returnsDataService.query().subscribe((res: HttpResponse<IReturnsData[]>) => (this.returnsdata = res.body || []));
    });
  }

  updateForm(returnItems: IReturnItems): void {
    this.editForm.patchValue({
      id: returnItems.id,
      quantity: returnItems.quantity,
      itemCode: returnItems.itemCode,
      returnCode: returnItems.returnCode,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const returnItems = this.createFromForm();
    if (returnItems.id !== undefined) {
      this.subscribeToSaveResponse(this.returnItemsService.update(returnItems));
    } else {
      this.subscribeToSaveResponse(this.returnItemsService.create(returnItems));
    }
  }

  private createFromForm(): IReturnItems {
    return {
      ...new ReturnItems(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      itemCode: this.editForm.get(['itemCode'])!.value,
      returnCode: this.editForm.get(['returnCode'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReturnItems>>): void {
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
