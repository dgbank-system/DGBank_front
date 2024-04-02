import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositeComponent } from './deposite/deposite.component';
import { PerformanceTranRoutingModule } from './performance-tran-routing.module';
import { FormsModule } from '@angular/forms';
import { PerformanceTranComponent } from './performTrxs/performance-tran.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    PerformanceTranComponent,
    TransferComponent,
    WithdrawComponent,
    DepositeComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PerformanceTranRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    
  ],
  providers: []
})
export class PerformanceTranModule { }