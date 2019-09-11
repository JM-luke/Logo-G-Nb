import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

const ADMIN_COMPONENTS = [
  AdminComponent,
  UsersComponent
];

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...ADMIN_COMPONENTS,
  ],
  exports: [ ...ADMIN_COMPONENTS ]
})
export class AdminModule { }
