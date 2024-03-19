import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-performance-tran',
  templateUrl: './performance-tran.component.html',
  styleUrls: ['./performance-tran.component.css']
})
export class PerformanceTranComponent {
  buttonDescription = "Here is our services in DGBank";
  constructor(private router: Router){}
  updateDescription(description: string) 
  {
    if(description === "transfer")
    {
      this.buttonDescription = "Transfer: Use this to initiate a transfer of funds from one account to another. Whether you're sending money to a friend, paying a bill, or managing your finances, the Transfer button makes it easy to move your money securely and efficiently"
    }
    if( description === "Withdraw")
    {
      this.buttonDescription = "Withdraw: This allows you to withdraw funds from your account. Whether you're taking out cash from an ATM, making a withdrawal at a bank, or managing your finances online, the Withdraw button gives you the flexibility to access your money when you need it. Simply click the Withdraw button to initiate a withdrawal transaction securely."

    }
    if( description === "Deposite")
    {
      this.buttonDescription = "Deposit: Use this to add funds to your account. Whether you're depositing cash, checks, or making an online transfer, the Deposit button simplifies the process of increasing your account balance. Click the Deposit button to securely and conveniently put money into your account, ensuring your finances are in good hands."
    }
   
  }

  resetDescription() {
    this.buttonDescription = "Here is our services in DGBank";
  }

navigateToTransfer()
{
  this.router.navigate(['/transfer']);
}

navigateToDeposite()
{
  this.router.navigate(['/deposite']);
}
navigateToWithdraw()
{
  this.router.navigate(['/withdraw']);
}
navigateTorule()
{
  this.router.navigate(['/rule']);
}
}
