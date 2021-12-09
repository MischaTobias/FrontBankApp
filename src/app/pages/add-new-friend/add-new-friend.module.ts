import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewFriendPageRoutingModule } from './add-new-friend-routing.module';

import { AddNewFriendPage } from './add-new-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewFriendPageRoutingModule
  ],
  declarations: [AddNewFriendPage]
})
export class AddNewFriendPageModule {}
