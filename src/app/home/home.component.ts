import { Component, HostListener, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('500ms ease')),
    ]),
  ],
})
export class HomeComponent implements OnInit {


currentBackgroundImage: string = 'assets/images/1.jpg';
  backgroundImages: string[] = [
    'url("assets/images/1.jpg")',
    'url("assets/images/2.jpg")',
    'url("assets/images/3.jpg")',
    'url("assets/images/4.jpg")'
  ];
  employeeName: any;


  changeBackground(imageUrl: string) {
    this.currentBackgroundImage = imageUrl;
  }


  resetBackgroundImage(imageUrl: string) {
    this.currentBackgroundImage = imageUrl; 
  }

constructor(private empService :EmployeeService, private router: Router){

}

ngOnInit(): void {

this.employeeName = this.empService.getEmployeeName()

}

navigateToAddCustomer() {
  this.router.navigate(['/addCustomer']); // Use the route path defined in your routes array
}

navigateToShowCustomer() {
  this.router.navigate(['/showCustomer']); // Use the route path defined in your routes array
}

navigateToAddAccountr() {
  this.router.navigate(['/addAccount']); // Use the route path defined in your routes array
}

navigateToshowTRx() {
  this.router.navigate(['/transactions']); // Use the route path defined in your routes array
}
navigateToshowAccount() {
  this.router.navigate(['/showAccount']); // Use the route path defined in your routes array
}
navigateToServices() {
  this.router.navigate(['/services']); // Use the route path defined in your routes array
}
navigateToAlert(event: Event) {
  event.preventDefault();
  this.router.navigate(['/alert']); // Use the route path defined in your routes array
}

}
