import {Component, OnInit} from '@angular/core';
import {Images} from "app/Constants/Images";
import {ROUTES} from "app/Constants/Routes";

@Component({
  selector: 'jhi-returns-menu',
  templateUrl: './returns-menu.component.html',
  styleUrls: [
    'returns-menu.component.scss'
  ]
})
export class ReturnsMenuComponent implements OnInit {

  message: string;

  constructor(public IMAGES:Images,public Routes:ROUTES) {
    this.message = 'ReturnsMenuComponent message';
  }

  ngOnInit(): void {
  }

}
