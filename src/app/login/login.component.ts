import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { loginDto } from '../interface/login';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent  {
  @Input() employeeName: string | undefined;
  employee: loginDto = {
  username: '',
  password: '',
} 
constructor(private employeeservice : EmployeeService, private toastr: ToastrService,private router: Router,) {
  
}

onLoginEmployee()
{
  this.employeeservice.loginEmployee(this.employee).subscribe(
    (response: any) => {

      const message = response.message
      const employeeName = response.emp
      this.employeeservice.setEmployeeName(employeeName);
      this.employeeName = this.employeeservice.getEmployeeName();
        console.log(message)
        this.toastr.success(message);
        this.navigateToHome()
        this.resetEmployee()
  },
    (error) => {
      // Handle an unsuccessful login response
     const message = error.error.message
      
      this.toastr.error(message);
    }
  );
}
navigateToRegister() {
  this.router.navigate(['/register']); // Use the route path defined in your routes array
}
resetEmployee() {
  this.employee = { 
    username: '',
    password: '',
  };
}
navigateToHome() {
  this.router.navigate(['/home']);// Use the route path defined in your routes array
}
}



