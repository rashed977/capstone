import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, TitleStrategy, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  constructor(private companyService:CompanyService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.companyService.isLoggedInUserCompany$.pipe(
      map((isLoggedIn)=>{
        if(!isLoggedIn){
          this.router.navigate(['not-authorized'])
          return false
        }else{
          return true
        }
      })
    )
  }

}
