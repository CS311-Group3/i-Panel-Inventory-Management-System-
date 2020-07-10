import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPurchases, Purchases } from 'app/shared/model/purchases.model';
import { PurchasesService } from './purchases.service';
import { IVendor } from 'app/shared/model/vendor.model';
import { VendorService } from 'app/entities/vendor/vendor.service';

@Component({
  selector: 'jhi-purchases-update',
  templateUrl: './purchases-update.component.html',
})
export class PurchasesUpdateComponent implements OnInit {
  isSaving = false;
  vendorids: IVendor[] = [];
  dateOfPurchaseDp: any;

  editForm = this.fb.group({
    id: [],
    total: [],
    discounts: [],
    dateOfPurchase: [],
    vendorID: [],
  });

  constructor(
    protected purchasesService: PurchasesService,
    protected vendorService: VendorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchases }) => {
      this.updateForm(purchases);

      this.vendorService
        .query({ filter: 'purchases-is-null' })
        .pipe(
          map((res: HttpResponse<IVendor[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IVendor[]) => {
          if (!purchases.vendorID || !purchases.vendorID.id) {
            this.vendorids = resBody;
          } else {
            this.vendorService
              .find(purchases.vendorID.id)
              .pipe(
                map((subRes: HttpResponse<IVendor>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IVendor[]) => (this.vendorids = concatRes));
          }
        });
    });
  }

  updateForm(purchases: IPurchases): void {
    this.editForm.patchValue({
      id: purchases.id,
      total: purchases.total,
      discounts: purchases.discounts,
      dateOfPurchase: purchases.dateOfPurchase,
      vendorID: purchases.vendorID,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchases = this.createFromForm();
    if (purchases.id !== undefined) {
      this.subscribeToSaveResponse(this.purchasesService.update(purchases));
    } else {
      this.subscribeToSaveResponse(this.purchasesService.create(purchases));
    }
  }

  private createFromForm(): IPurchases {
    return {
      ...new Purchases(),
      id: this.editForm.get(['id'])!.value,
      total: this.editForm.get(['total'])!.value,
      discounts: this.editForm.get(['discounts'])!.value,
      dateOfPurchase: this.editForm.get(['dateOfPurchase'])!.value,
      vendorID: this.editForm.get(['vendorID'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchases>>): void {
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

  trackById(index: number, item: IVendor): any {
    return item.id;
  }
}
