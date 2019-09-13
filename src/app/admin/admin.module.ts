import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

import { TablesModule } from '../common/tables/tables.module';

const ADMIN_COMPONENTS = [
  AdminComponent,
  UsersComponent
];

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    ThemeModule,
    MiscellaneousModule,
    
    TablesModule,
  ],
  declarations: [
    ...ADMIN_COMPONENTS,
  ]
  
})
export class AdminModule { }
