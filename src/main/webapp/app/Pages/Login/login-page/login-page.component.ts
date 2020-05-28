import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [
    'login-page.component.scss'
  ]
})
export class LoginPageComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'LoginPageComponent message';
  }

  ngOnInit(): void {
  }

}
