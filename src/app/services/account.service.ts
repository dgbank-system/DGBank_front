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
    return this.http.get<Account[]>(`${this.apiUrl}/account/all`).pipe(
      tap((accounts: Account[]) => {
        this.updateAccounts(accounts);
      }),
      catchError(error => {
        console.error('Error fetching accounts:', error);
        return throwError(error); // Rethrow the error to the calling code
      })
    );
  }

  public addAccount(account :Account ) : Observable<Account>
  {
    return this.http.post<Account>(`${this.apiUrl}/account/add`,account)
  }

  private updateAccounts(accounts: Account[]): void {
   
   
    this.accountsSubject.next(accounts);
    this.sharingService.setSettings(accounts); // Save accounts using SharingService
  }
}