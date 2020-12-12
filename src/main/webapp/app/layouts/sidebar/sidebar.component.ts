import { Component } from '@angular/core';
import {ROUTES} from "app/Constants/Routes";

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public Routes:ROUTES) {
  }
}
