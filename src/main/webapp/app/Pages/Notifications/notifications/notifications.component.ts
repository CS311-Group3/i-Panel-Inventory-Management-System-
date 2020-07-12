import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: [
    'notifications.component.scss'
  ]
})
export class NotificationsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'NotificationsComponent message';
  }

  ngOnInit(): void {
  }

}
