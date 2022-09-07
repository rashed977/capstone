import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { take, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router ,
    private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLoggedInUserPerson$.pipe(
      map((isLoggedIn)=>{
        if(!isLoggedIn){
          this.router.navigate(['not-authorized'])
          return false
        }else{
          return true
        }
      })
    )
    // .pipe(
    //   take(1),
    //   map((data)=>{
    //     if(data){
    //       return true
    //     }else{
    //       this.router.navigate(['userlog'])
    //       return false
    //     }
    //   })
    // )
  }

}
