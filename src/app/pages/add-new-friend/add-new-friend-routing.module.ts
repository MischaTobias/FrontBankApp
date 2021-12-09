import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewFriendPage } from './add-new-friend.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewFriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewFriendPageRoutingModule {}
