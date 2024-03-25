import { Component, OnInit } from '@angular/core';
import { Transfer } from '../../interface/transfer';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../interface/account';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharingService } from 'src/app/services/sharingService.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  amount : number | undefined;
  selectedAccountAId : number =0;
  selectedAccountBId : number =0;
  selectedAccountA: Account | undefined;
  selectedAccountB: Account | undefined;
  balance: number = 0;
  accountIds: number[] = [];
  accounts!: Account[];

  constructor(private transferService : TransactionService,
              private toaster : ToastrService,
              private accountService : AccountService ,
              private sharingService : SharingService ) {}

  ngOnInit(): void {

    const data = this.sharingService.getStorage();
    if(data != null)
    {
        this.accountIds = data;
    } else
    {
    this.accountService.fetchIDAccounts().subscribe(ids => {
      this.accountIds = ids;
    });
    }

  }


  PerformTransfer()
  {
    this.transferService.addTransfer(this.selectedAccountA?.id , this.selectedAccountB?.id , this.amount).subscribe(
      (response : any) => 
      {
        const msg = response.description
        if( response.status === "Successful")
        {
          this.toaster.success(msg)
        }
        else{
          this.toaster.error(msg)
        }
      },
      (error) => 
      {
        const message = error.error.message
        this.toaster.error(message)
      }
    )
  }
  onAccountChange(accountType: string) {
  
    if (accountType === 'accountA') {
      // this.accountService.getAccountById(this.selectedAccountAId).subscribe(
      //   (account: Account) => {
      //     this.selectedAccountA = account;
      //     this.balance = this.selectedAccountA.balance;
      //   },
      //   (error) => {
      //     console.error('Error:', error);
      //   }
      //  )
      
    } else if (accountType === 'accountB') {
      
    
  }
  }

}
