import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../interface/account';
import { AccountService } from '../../services/account.service';
import { SharingService } from 'src/app/services/sharingService.service';


@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {

  amount : number | undefined;
  selectedAccountId : number = 0 ;
  selectedAccount: Account | undefined// Initialize it with an appropriate data type
  accountIds: number[] = [];
  accounts!: Account[];
  balance : number | undefined ;

  constructor(private transferService : TransactionService ,
              private toaster : ToastrService ,
              private accountService :AccountService,
              private sharingService : SharingService ){}

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

  performDeposite()
  {
    this.transferService.addDeposite(this.selectedAccount?.id , this.amount).subscribe(
      (response : any) => 
      {
        const msg = response.description;
        this.balance = response.balance;
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

    onAccountChange() {
    // Find the selected account by its ID
    this.accountService.getAccountById(this.selectedAccountId).subscribe(
      (account: Account) => {
        this.selectedAccount = account;
        this.balance = this.selectedAccount.balance;
      },
      (error) => {
        console.error('Error:', error);
      }
     )
  }



}
