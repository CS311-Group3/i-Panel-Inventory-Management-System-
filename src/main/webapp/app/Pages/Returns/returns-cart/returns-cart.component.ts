import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-returns-cart',
  templateUrl: './returns-cart.component.html',
  styleUrls: [
    'returns-cart.component.scss'
  ]
})
export class ReturnsCartComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'ReturnsCartComponent message';
  }

  ngOnInit(): void {
  }

}
