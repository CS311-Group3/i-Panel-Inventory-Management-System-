import {Component, OnInit} from '@angular/core';
import {Images} from "app/Constants/Images";

@Component({
  selector: 'jhi-returns-menu',
  templateUrl: './returns-menu.component.html',
  styleUrls: [
    'returns-menu.component.scss'
  ]
})
export class ReturnsMenuComponent implements OnInit {

  message: string;

  constructor(public IMAGES:Images) {
    this.message = 'ReturnsMenuComponent message';
  }

  ngOnInit(): void {
  }

}
