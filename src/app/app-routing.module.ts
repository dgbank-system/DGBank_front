import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { AccountfFormComponent } from './account/accountf-form/accountf-form.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AccountfDetailsComponent } from './account/accountf-details/accountf-details.component';
import { PerformanceTranComponent } from './performance-tran/performance-tran.component';
import { TransferComponent } from './performance-tran/transfer/transfer.component';
import { DepositeComponent } from './performance-tran/deposite/deposite.component';
import { WithdrawComponent } from './performance-tran/withdraw/withdraw.component';
import { AlertComponent } from './alert/alert.component';
import { RuleComponent } from './rule/rule.component';
const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'addCustomer', component: CustomerFormComponent },
  { path: 'showCustomer', component: CustomerDetailsComponent },
  { path : 'addAccount' , component: AccountfFormComponent},
  { path : 'transactions' , component: TransactionsComponent},
  { path : 'showAccount' , component: AccountfDetailsComponent},
  { path : 'services' , component : PerformanceTranComponent},
  { path : 'transfer' , component :TransferComponent},
  { path: 'deposite' , component : DepositeComponent},
  { path : 'withdraw' , component :WithdrawComponent },
  { path : 'alert' , component: AlertComponent},
  { path : 'rule' , component:RuleComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

