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
 
  private accountsSubject = new BehaviorSubject<number[]>([]);
  accounts$ = this.accountsSubject.asObservable();


  constructor(private http: HttpClient , 
              private sharingService: SharingService ) { }

  public getAccounts() : Observable<Account[]>
  {
    return this.http.get<Account[]>(`${this.apiUrl}/account/all`);
  }

  public fetchIDAccounts(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/account/ids`).pipe(
      tap((ids: number[]) => {
        this.updateAccounts(ids);
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

  private updateAccounts(ids: number[]): void {
    this.accountsSubject.next(ids);
    this.sharingService.setStorage(ids); 
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/account/find/${id}`);
  }
}