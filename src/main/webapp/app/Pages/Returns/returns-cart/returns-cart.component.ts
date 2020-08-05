import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReturnPopupComponent} from "app/Pages/Returns/returns-popup/return-popup.component";

@Component({
  selector: 'jhi-returns-cart',
  templateUrl: './returns-cart.component.html',
  styleUrls: [
    'returns-cart.component.scss'
  ]
})
export class ReturnsCartComponent implements OnInit {

  message: string;

  constructor(private modalService: NgbModal) {
    this.message = 'ReturnsCartComponent message';
  }

  ngOnInit(): void {
  }


  openPopUp(): void {
    this.modalService.open(ReturnPopupComponent);
  }

}
