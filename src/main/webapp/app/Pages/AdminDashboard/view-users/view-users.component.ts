import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: [
    'view-users.component.scss'
  ]
})
export class ViewUsersComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'ViewUsersComponent message';
  }

  ngOnInit(): void {
  }

}
