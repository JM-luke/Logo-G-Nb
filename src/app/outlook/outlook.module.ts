import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutlookRoutingModule } from './outlook-routing.module';
import { MailComponent } from './mail/mail.component';
import { OutlookComponent } from './outlook.component';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

@NgModule({
  declarations: [MailComponent, OutlookComponent],
  imports: [
    CommonModule,
    ThemeModule,
    OutlookRoutingModule,
    MiscellaneousModule
  ]
})
export class OutlookModule { }
