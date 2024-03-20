import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Account } from '../interface/account';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiBaseUrl;
 
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  accounts$ = this.accountsSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getAccounts() : Observable<Account[]>
  {
    return this.http.get<Account[]>(`${this.apiUrl}/account/all`);
  }

  public fetchAccounts(): void {
    this.http.get<Account[]>(`${this.apiUrl}/account/all`).subscribe(
      (accounts: Account[]) => {
        this.accountsSubject.next(accounts);
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  public addAccount(account :Account ) : Observable<Account>
  {
    return this.http.post<Account>(`${this.apiUrl}/account/add`,account)
  }


}