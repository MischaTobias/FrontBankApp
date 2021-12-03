import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountStatusPage } from './account-status.page';

const routes: Routes = [
  {
    path: '',
    component: AccountStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountStatusPageRoutingModule {}
