import {Component, Injectable, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVendor, Vendor } from 'app/shared/model/vendor.model';
import { VendorService } from './vendor.service';
import {PurchaseData} from "app/Pages/Purchase/purchase-data";

@Injectable({providedIn:"root"})
@Component({
  selector: 'jhi-vendor-update',
  templateUrl: './vendor-update.component.html',
})
export class VendorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    vendorName: [],
    phone: [],
    email: [],
    address: [],
  });

  constructor(protected vendorService: VendorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder,public purchaseData:PurchaseData) {}

  createVendor():void{
    this.purchaseData.vendor = this.createFromForm();
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vendor }) => {
      this.updateForm(vendor);
    });
  }

  updateForm(vendor: IVendor): void {
    this.editForm.patchValue({
      id: vendor.id,
      vendorName: vendor.vendorName,
      phone: vendor.phone,
      email: vendor.email,
      address: vendor.address,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vendor = this.createFromForm();
    if (vendor.id !== undefined) {
      this.subscribeToSaveResponse(this.vendorService.update(vendor));
    } else {
      this.subscribeToSaveResponse(this.vendorService.create(vendor));
    }
  }

  private createFromForm(): IVendor {
    return {
      ...new Vendor(),
      vendorName: this.editForm.get(['vendorName'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      email: this.editForm.get(['email'])!.value,
      address: this.editForm.get(['address'])!.value,
    };
  }

  public subscribeToSaveResponse(result: Observable<HttpResponse<IVendor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    // this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
