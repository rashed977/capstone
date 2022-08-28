import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,
    private router:Router , private toast:HotToastService) { }
  personStatus?:string;
  personLoginForm=this.fb.group({
  email:this.fb.control('',[Validators.required,Validators.email]),
  password:this.fb.control('',[Validators.required,Validators.minLength(8)])
})
get email(){
  return this.personLoginForm.get('email')
}
get password(){
  return this.personLoginForm.get('password')
}
hide = true;

personLogin(){
  this.authService.adminSignIn(this.personLoginForm.controls.email.value+'',
  this.personLoginForm.controls.password.value+'')
  .pipe(
    this.toast.observe({
      loading:'Logging In ...',
      success:'Welcome To We Platform',
      error:(error)=>'This error Haappened: '+error
    })
  )
  .subscribe({
    next:(data)=>{this.router.navigate(['user'])},
    error:(error:FirebaseError)=>{
      this.personStatus=error.message;
    }
  })
}
back(){
  this.router.navigate(['landingg/select'])
}
  ngOnInit(): void {
  }

}
