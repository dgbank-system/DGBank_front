import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositeComponent } from './deposite/deposite.component';
import { PerformanceTranComponent } from './performTrxs/performance-tran.component';

const routes: Routes = [
  { path: 'all',  component: PerformanceTranComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'deposite',  component: DepositeComponent },
  { path: '', redirectTo: 'all', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceTranRoutingModule { }
