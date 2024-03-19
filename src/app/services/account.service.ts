import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Account } from '../interface/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiBaseUrl;
 

  constructor(private http: HttpClient) { }
  public getAccount() : Observable<Account[]>
  {
    return this.http.get<Account[]>(`${this.apiUrl}/account/all`);
  }

  public addAccount(account :Account ) : Observable<Account>
  {
    return this.http.post<Account>(`${this.apiUrl}/account/add`,account)
  }


}