import { Component } from '@angular/core';
//import { LocalDataSource } from 'ng2-smart-table';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';

//import { SmartTableService } from '../../../@core/data/smart-table.service';
//import { UsersTableService } from '../../../admin/services/users-table-service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      /*id: {
        title: 'ID',
        type: 'number',
      },*/
      fullName: {
        title: 'Full Name',
        type: 'string',
      },
      emailGroups:{
        title: 'Email Groups',
        type: '[string]',
      },
      roles: {
        title: 'roles',
        type: '[string]',
      },
      /*
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },*/
      email: {
        title: 'E-mail',
        type: 'string',
      },
      /*
      age: {
        title: 'Age',
        type: 'number',
      },*/
    },
  };

  //source: LocalDataSource = new LocalDataSource();
  source: ServerDataSource;

  //constructor(private service: UsersTableService) {
  constructor(http: HttpClient){
    //const data = this.service.getData();
    //this.source.load(data);
    this.source = new ServerDataSource(http, { endPoint: 'http://localhost:3000/api/users' });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
