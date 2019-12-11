import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutlookComponent } from './outlook.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [{
  path: '',
  component: OutlookComponent,
  children: [{
    path: 'mail',
    component: MailComponent,
  },
  // {
  //   path: '',
  //   redirectTo: '/outlook/',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutlookRoutingModule { }
