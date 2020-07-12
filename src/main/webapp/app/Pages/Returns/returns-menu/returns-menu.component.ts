import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-returns-menu',
  templateUrl: './returns-menu.component.html',
  styleUrls: [
    'returns-menu.component.scss'
  ]
})
export class ReturnsMenuComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'ReturnsMenuComponent message';
  }

  ngOnInit(): void {
  }

}
