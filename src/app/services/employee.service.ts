import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../interface/employee';
import { Observable } from 'rxjs';
import { loginDto } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  private employeeName: string = '';

  public addEmployee(employee :Employee) : Observable<Employee>
  {
    return this.http.post<Employee>(`${this.apiUrl}/employee/register`,employee)
  }

  public loginEmployee(employee: loginDto) : Observable<Employee>
  {
    return this.http.post<Employee>(`${this.apiUrl}/employee/login`,employee)
  }
  

  setEmployeeName(name: string): void {
    this.employeeName = name;
    localStorage.setItem('employeeName', this.employeeName);
  }

  getEmployeeName(): string {
    this.employeeName = localStorage.getItem('employeeName') || ''; // Use the empty string as the default value if it's null
    return this.employeeName;
  }
}
