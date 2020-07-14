import {Component, OnInit} from '@angular/core';
import {VendorService} from "app/entities/vendor/vendor.service";
import {IVendor, Vendor} from "app/shared/model/vendor.model";

@Component({
  selector: 'jhi-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: [
    'vendor-details.component.scss'
  ]
})
export class VendorDetailsComponent implements OnInit {

  name: string;
  phone: string;
  email: string;
  address: string;
  vendor:IVendor = new Vendor();
  constructor(private vendorService:VendorService) {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.address = '';
  }

  ngOnInit(): void {
  }

  createVendor():void{
    this.vendorService.create(this.create());
  }

  create():IVendor{
    // this.vendor.vendorName = this.name;
    // this.vendor.address = this.address;
    // this.vendor.email = this.email;
    // this.vendor.phone = this.phone;
    //
    // this.vendorService.create(this.vendor);

    return {
      ...new Vendor(),
      id:undefined,
      vendorName: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };
  }


}
