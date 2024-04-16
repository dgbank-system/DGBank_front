import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Alert } from '../interface/alert';
import { AlertService } from '../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
alerts!: Alert[]
showTransactions?: false
@ViewChild('deleteModalCloseButton') deleteModalCloseButton: ElementRef | undefined;
public selectedAlert: Alert | null = null
constructor(private alertService : AlertService,private renderer: Renderer2, private el: ElementRef){}
  ngOnInit(): void {
   this.getAlerts()
  }

  getAlerts()
  {
    this.alertService.getAlert().subscribe(
      (response: Alert[]) =>
      {
        this.alerts = response
      },
      (error : HttpErrorResponse) =>
      {
        alert(error.message)
      }
    )
  }
  public searchAlert(key : string)
  {
   if (!key) {
     this.getAlerts(); // Get all customers when no search key is provided
     return;
   }
 
   const result: Alert[] = [];
 
   for (const customer of this.alerts) {
     if (customer.id.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
       result.push(customer);
     }
   }
 
   this.alerts = result;
  }

  toggleTransactions(alert: Alert) {
    alert.showTransactions = !alert.showTransactions;
  }

//   showDialog() {
//     this.dialogVisible = true;
// }
public onOpenModel(alert:Alert | null ): void{
  
  this.selectedAlert = alert;
  const modal = this.el.nativeElement.querySelector('#TransactionTable');
  this.renderer.addClass(modal, 'show');
  this.renderer.setStyle(modal, 'display', 'block');
 }



}
