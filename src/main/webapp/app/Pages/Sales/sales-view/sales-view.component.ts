import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: [
    'sales-view.component.scss'
  ]
})
export class SalesViewComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'SalesViewComponent message';
  }

  ngOnInit(): void {
  }

}
