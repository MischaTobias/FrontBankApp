import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountStatusPageRoutingModule } from './account-status-routing.module';

import { AccountStatusPage } from './account-status.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountStatusPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AccountStatusPage]
})
export class AccountStatusPageModule {}
