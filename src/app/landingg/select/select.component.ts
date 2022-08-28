import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
adminLogin(){
this.router.navigate(['adminlog'])
}
adminRegistration(){
  this.router.navigate(['adminSignUp'])
}
userLogin(){
this.router.navigate(['userlog'])
// this.router.navigate(['user'])
}
userSignUp(){
  this.router.navigate(['userSignUp'])
}
}
