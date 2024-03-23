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

  public addTransfer(id1? : number ,id2? : number , amount? : number) : Observable<Transaction>
  {
    const url  = `${this.apiUrl}/transaction/transfer?id1=${id1}&id2=${id2}&amount=${amount}`
    return this.http.post<Transaction>(url,null);
  }

  public addDeposite(id? : number , amount? : number) : Observable<Transaction>
  {
    const url  = `${this.apiUrl}/transaction/deposite?id=${id}&amount=${amount}`
    return this.http.post<Transaction>(url,null);
  }
  


  public addWithdraw(id? : number , amount? : number) : Observable<Transaction>
  {
    const url  = `${this.apiUrl}/transaction/withdraw?id=${id}&amount=${amount}`
    return this.http.post<Transaction>(url,null);
  }
}
