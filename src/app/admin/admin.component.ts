import { Component, OnInit } from '@angular/core';
import { ADMIN_MENU_ITEMS } from './admin-menu';

@Component({
  selector: 'ngx-admin',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menu = ADMIN_MENU_ITEMS;
  constructor() { }

  ngOnInit() {
  }

}
