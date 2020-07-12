import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: [
    'inventory-view.component.scss'
  ]
})
export class InventoryViewComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'InventoryViewComponent message';
  }

  ngOnInit(): void {
  }

}
