import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: [
    'admin-menu.component.scss'
  ]
})
export class AdminMenuComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'AdminMenuComponent message';
  }

  ngOnInit(): void {
  }

}
