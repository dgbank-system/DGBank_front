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
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: HttpClient) { }

  public addAccount(account: Account, username: string, password: string): Observable<Account> {
      const url = `${this.proxyUrl}${this.apiUrl}/account/add`;
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      });

      const options = {
        headers: headers,// Note: This will still enforce CORS, but it will be a "no-cors" mode request
      };

      return this.http.post<Account>(`${this.apiUrl}/account/add`, account, options);
    }

  //   const headers = new HttpHeaders({
  //   'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  // });
  //   return this.http.post<Account>(`${this.apiUrl}/customer/add`,account,{headers})
  // }
}
