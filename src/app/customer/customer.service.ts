import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../interface/customer';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getCustomer(username : String, password : String) : Observable<Customer[]>
  {
    const base64Credentials = btoa(`${username}:${password}`);

    // Set the Authorization header with Basic authentication
    const headers = new HttpHeaders({
      Authorization: `Basic ${base64Credentials}`,
    });

    // Send a request to the server for authentication
    return this.http.get<Customer[]>(`${this.apiUrl}/customer/all`, { headers });
      
  }

  public addCustomer(customr :Customer , username : String , password : String) : Observable<Customer>
  {
    const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  });
    return this.http.post<Customer>(`${this.apiUrl}/customer/add`,customr,{headers})
  }

  public updateCustomer(customr: Customer): Observable<Customer>
  {
    return this.http.put<Customer>(`${this.apiUrl}/customer/update`,customr)
  }

  public deleteCustomer(customerId : number) : Observable<Customer>
  {
    return this.http.delete<Customer>(`${this.apiUrl}/customer/delete/${customerId}`)
  }


}
