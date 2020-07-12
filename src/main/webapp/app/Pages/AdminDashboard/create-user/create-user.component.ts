import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    'create-user.component.scss'
  ]
})
export class CreateUserComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'CreateUserComponent message';
  }

  ngOnInit(): void {
  }

}
