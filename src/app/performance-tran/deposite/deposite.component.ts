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

  constructor(private transferService : TransactionService ,
              private toaster : ToastrService ,
              private accountService :AccountService,
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

  performDeposite()
  {
    this.transferService.addDeposite(this.selectedAccount?.id , this.amount).subscribe(
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
    // Find the selected account by its ID
    const selectedAccountId = Number(this.selectedAccountId);
    this.selectedAccount = this.accounts.find(account => account.id === selectedAccountId);
  }



}
