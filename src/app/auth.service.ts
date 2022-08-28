import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TitleStrategy } from '@angular/router';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
adminState$=this.fireAuth.authState;
personState$=this.fireAuth.authState;
  // userState$: any;
  constructor(private fireAuth:AngularFireAuth) { }
  adminSignIn(email:string,password:string){
    return from(this.fireAuth.signInWithEmailAndPassword(email,password));
  }
  adminSignOut(){
    return from(this.fireAuth.signOut());
  }
  adminSignUp(email:string, password:string){
    return from(this.fireAuth.createUserWithEmailAndPassword(email,password));
  }
  personSignIn(email:string,password:string){
    return from(this.fireAuth.signInWithEmailAndPassword(email,password));
  }
  personSignUp(email:string,password:string){
    return from(this.fireAuth.createUserWithEmailAndPassword(email,password));
  }
  personSignOut(){
    return from(this.fireAuth.signOut())
  }
}
