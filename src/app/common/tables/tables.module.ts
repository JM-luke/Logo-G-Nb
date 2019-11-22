import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
//import { UsersTableService } from '../../admin/services/users-table-service';
import { SmartTableComponent } from './smart-table/smart-table.component';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    //UsersTableService,
  ],
  exports: [ SmartTableComponent ],
})
export class TablesModule { }
