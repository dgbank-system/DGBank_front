import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositeComponent } from './deposite/deposite.component';
import { RuleComponent } from './scenarios/rule.component';
import { PerformanceTranRoutingModule } from './performance-tran-routing.module';
import { FormsModule } from '@angular/forms';
import { PerformanceTranComponent } from './performTrxs/performance-tran.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {  StepperComponent } from './stepper/stepper.component';
import { ScenariosTestComponent } from './scenarios-test/scenarios-test.component';
import { InformationComponent } from './stepper/info.component';
import { ContactComponent } from './stepper/contact.component';
import { SecurityComponent } from './stepper/security.component';
import { FinishComponent } from './stepper/finish.component';
import { AppComponent } from '../app.component';
import { AggComponent } from './stepper/agg.component';

@NgModule({
  declarations: [
    PerformanceTranComponent,
    TransferComponent,
    WithdrawComponent,
    DepositeComponent,
    RuleComponent,
    StepperComponent ,
    ScenariosTestComponent,
    InformationComponent,
    ContactComponent,
    SecurityComponent,
    FinishComponent,
    AggComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PerformanceTranRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    MatStepperModule,
    CdkStepperModule,

  ],
  exports:[CdkStepperModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class PerformanceTranModule { }