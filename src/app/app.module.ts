import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerService } from './services/customer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { AccountfFormComponent } from './account/accountf-form/accountf-form.component';
import { AccountfDetailsComponent } from './account/accountf-details/accountf-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AlertComponent } from './alert/alert.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerFormComponent,
    CustomerDetailsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountfFormComponent,
    AccountfDetailsComponent,
    TransactionsComponent,
    AlertComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center',
    preventDuplicates: true,
    timeOut: 1000,}),
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
      }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
