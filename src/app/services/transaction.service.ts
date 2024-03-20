import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Transaction } from '../interface/transaction';
import { Transfer } from '../interface/transfer';
import { Deposite_Withdraw } from '../interface/deposite&withdraw';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiBaseUrl;
 
  constructor(private http:HttpClient) { }

  public getTrx() : Observable<Transaction[]>
  {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transaction/all`);
  }

  public addTransfer(transfer : Transfer) : Observable<Transaction>
  {
    return this.http.post<Transaction>(`${this.apiUrl}/transaction/transfer`,transfer);
  }

  public addDeposite(deposite : Deposite_Withdraw) : Observable<Transaction>
  {
    return this.http.post<Transaction>(`${this.apiUrl}/transaction/deposite`,deposite)
  }
  
  public addWithdraw(withdraw : Deposite_Withdraw) : Observable<Transaction>
  {
    return this.http.post<Transaction>(`${this.apiUrl}/transaction/withdraw`,withdraw)
  }

  public addWithdraw2(id? : number , amount? : number) : Observable<Transaction>
  {
    const url  = `${this.apiUrl}/transaction/withdraw?id=${id}&amount=${amount}`
    return this.http.post<Transaction>(url,null);
  }
}
