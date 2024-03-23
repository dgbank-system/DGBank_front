import { Component, OnInit } from '@angular/core';
import { Deposite_Withdraw } from '../../interface/deposite&withdraw';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interface/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Type } from '../../enum/typeEnum';
import { SharingService } from 'src/app/services/sharingService.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  amount : number | undefined;
  selectedAccount: Account | undefined ;
  accountfNames : String[] = [];
  accountlNames : String[] = []
  accounts!: Account[];
  selectedAccountId: number = 0;

  constructor(private transactionSrevice : TransactionService ,
              private toaster : ToastrService,
              private accountService : AccountService ,
              private sharingService : SharingService ){}

  ngOnInit(): void {
    const data = this.sharingService.getUserSettings();
    if(data != null)
    {
        this.accounts = data;
    } else
    {
    this.accountService.fetchAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }
  
  }


  performWithdraw()
  {
    this.transactionSrevice.addWithdraw(this.selectedAccount?.id , this.amount ).subscribe(
      (response : any) => 
      {
        const msg = response.description
        if(response.status === "Successful")
        {
          this.toaster.success(msg)
        }
        else{
          this.toaster.error(msg)
        }
      },
      (error) => 
      {
        const msg = error.error.message
        this.toaster.error(msg)
      }
    )
  }
  onAccountChange(event: any) {
    console.log(event.target.value);
    const selectedAccountIdNumber = Number(event.target.value);
  
    // Find the selected account by its ID
    this.selectedAccount = this.accounts.find(account => account.id === selectedAccountIdNumber);

  }


}
