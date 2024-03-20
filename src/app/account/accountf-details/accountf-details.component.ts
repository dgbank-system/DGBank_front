import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/interface/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-accountf-details',
  templateUrl: './accountf-details.component.html',
  styleUrls: ['./accountf-details.component.css']
})
export class AccountfDetailsComponent implements OnInit{
  public accounts!: Account[];
  constructor(private accountService: AccountService){}
  
  ngOnInit(): void {
    this.getAccounts()
  }
  
  public getAccounts()
  {
    this.accountService.getAccounts().subscribe(
      (response : Account[]) =>
      {
        this.accounts = response
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
 public searchAccount(key : string)
 {
  if (!key) {
    this.getAccounts(); // Get all customers when no search key is provided
    return;
  }

  const result: Account[] = [];

  for (const customer of this.accounts) {
    if (customer.id.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      result.push(customer);
    }
  }

  this.accounts = result;
 }
}
