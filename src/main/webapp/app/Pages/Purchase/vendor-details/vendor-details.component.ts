import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: [
    'vendor-details.component.scss'
  ]
})
export class VendorDetailsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'VendorDetailsComponent message';
  }

  ngOnInit(): void {
  }

}
