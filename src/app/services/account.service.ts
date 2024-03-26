import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Account } from '../interface/account';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { SharingService } from './sharingService.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiBaseUrl;
 
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  accounts$ = this.accountsSubject.asObservable();


  constructor(private http: HttpClient , 
              private sharingService: SharingService ) { }

  public getAccounts() : Observable<Account[]>
  {
    return this.http.get<Account[]>(`${this.apiUrl}/account/all`);
  }

  public fetchAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/account/all/Trxs`).pipe(
      tap(accounts => this.accountsSubject.next(accounts))
    );
  }

  public addAccount(account :Account ) : Observable<Account>
  {
    return this.http.post<Account>(`${this.apiUrl}/account/add`,account)
  }

  updateBalance(accountId: number | undefined, newBalance: number): void {
    const accounts = this.accountsSubject.getValue();
    const updatedAccounts = accounts.map(account => {
      if (account.id == accountId) {
        return { ...account, balance: newBalance };
      }
      return account;
    });
    this.accountsSubject.next(updatedAccounts);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/account/find/${id}`);
  }
}