import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { pipe } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  constructor(private fb :FormBuilder,private router:Router,
    private authService:AuthService, private toast:HotToastService) { }

adminRegisterForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(8)]],
  confirmPassword:['',Validators.required]
},{ validators:this.passwordMatchingValidator()});
  ngOnInit(): void {
  }
  get email(){
    return this.adminRegisterForm.get('email')
  }
  get password(){
    return this.adminRegisterForm.get('password')
  }
  get confirmPassword(){
    return this.adminRegisterForm.get('confirmPassword')
  }
  back(){
    this.router.navigate(['landingg/select'])
  }
  hide = true;
submit(){
const formValue=this.adminRegisterForm.value;
this.authService.adminSignUp(formValue.email+'',formValue.password+'')
.pipe(
this.toast.observe({
  loading:'Registering User ...',
  success:'Succesfully Registered',
  error:(error)=> 'Error Happened '+error
})
)
.subscribe({
  next:()=>{this.router.navigate(['adminlog'])
  },
  error:(error)=> alert('Error '+error)

})
};

passwordMatchingValidator() : ValidatorFn {
  return (control) : ValidationErrors | null => {

  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;

  if(password && confirm && password!==confirm){
    return{
      //invalid form input
      passwordDontMatch:true
    }
  }
  // validation is valid
    return null;
  }
  }
}
