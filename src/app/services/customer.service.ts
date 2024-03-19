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

  public getCustomer() : Observable<Customer[]>
  {
    return this.http.get<Customer[]>(`${this.apiUrl}/customer/all`);
  }

  public addCustomer(customr :Customer ) : Observable<Customer>
  {
   
    return this.http.post<Customer>(`${this.apiUrl}/customer/add`,customr)
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
