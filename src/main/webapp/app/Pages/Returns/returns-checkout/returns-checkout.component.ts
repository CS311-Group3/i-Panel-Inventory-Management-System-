import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-returns-checkout',
  templateUrl: './returns-checkout.component.html',
  styleUrls: [
    'returns-checkout.component.scss'
  ]
})
export class ReturnsCheckoutComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'ReturnsCheckoutComponent message';
  }

  ngOnInit(): void {
  }

}
