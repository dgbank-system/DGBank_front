import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Alert } from '../interface/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getAlert() : Observable<Alert[]>
  {
    return this.http.get<Alert[]>(`${this.apiUrl}/customer/alert`);
  }
}
