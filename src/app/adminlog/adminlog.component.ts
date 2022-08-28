import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-adminlog',
  templateUrl: './adminlog.component.html',
  styleUrls: ['./adminlog.component.css']
})
export class AdminlogComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,
    private router:Router ,private toast:HotToastService) { }
adminStatus?:string;
  adminLoginForm=this.fb.group({
  email:this.fb.control('',[Validators.required,Validators.email]),
  password:this.fb.control('',[Validators.required,Validators.minLength(8)])
})
get email(){
  return this.adminLoginForm.get('email')
}
get password(){
  return this.adminLoginForm.get('password')
}
hide = true;

adminLogin(){
  this.authService.adminSignIn(this.adminLoginForm.controls.email.value+'',
  this.adminLoginForm.controls.password.value+'')
  .pipe(
    this.toast.observe({
      loading:'Logging In ...',
      success:'Welcome To We Platform',
      error:(error)=>'This error Haappened: '+error
    })
  )
  .subscribe({
    next:(data)=>{this.router.navigate(['admin'])},
    error:(error:FirebaseError)=>{
      this.adminStatus=error.message;
    }
  })
}
back(){
  this.router.navigate(['landingg/select'])
}
ngOnInit(): void {  }
}
