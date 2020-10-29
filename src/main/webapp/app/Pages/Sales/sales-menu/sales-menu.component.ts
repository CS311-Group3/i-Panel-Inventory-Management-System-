import {Component, OnInit} from '@angular/core';
import {Images} from "app/Constants/Images";

@Component({
  selector: 'jhi-sales-menu',
  templateUrl: './sales-menu.component.html',
  styleUrls: [
    'sales-menu.component.scss'
  ]
})
export class SalesMenuComponent implements OnInit {

  message: string;

  constructor(public IMAGES:Images) {
    this.message = 'SalesMenuComponent message';
  }

  ngOnInit(): void {
  }

}
