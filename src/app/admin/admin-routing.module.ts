
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '',
    redirectTo: '/pages/iot-dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}