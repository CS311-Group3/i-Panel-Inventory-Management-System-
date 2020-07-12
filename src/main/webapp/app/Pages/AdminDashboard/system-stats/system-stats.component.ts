import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-system-stats',
  templateUrl: './system-stats.component.html',
  styleUrls: [
    'system-stats.component.scss'
  ]
})
export class SystemStatsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'SystemStatsComponent message';
  }

  ngOnInit(): void {
  }

}
