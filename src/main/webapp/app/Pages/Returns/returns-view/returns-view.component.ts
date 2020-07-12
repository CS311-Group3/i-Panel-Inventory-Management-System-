import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-returns-view',
  templateUrl: './returns-view.component.html',
  styleUrls: [
    'returns-view.component.scss'
  ]
})
export class ReturnsViewComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'ReturnsViewComponent message';
  }

  ngOnInit(): void {
  }

}
