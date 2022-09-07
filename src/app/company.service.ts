import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import {from, map, of, switchMap} from 'rxjs'
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  public companiesCollection: AngularFirestoreCollection<CompanyData>;
  adminState$? : Observable<CompanyData | null | undefined>;
  isLoggedInUserCompany$ = this.authService.adminState$.pipe(
    switchMap((userCredentials)=> {
      if(userCredentials){
          return this.companiesCollection.doc(userCredentials.uid).get().pipe(
            switchMap((company)=> {
            // console.log(company, 'isLoggedInUserCompany' );
            if(company.exists) return of(true);
            else return of(false);
          }));
      }
      else {
        return of(false);
      }
    })
  )
  constructor(private firestore:AngularFirestore,
    private authService: AuthService)
  {
    this.companiesCollection = this.firestore.collection('companies');
    this.adminState$ = this.authService.adminState$
    .pipe(
      switchMap((data)=> {
          if(data){
            return this.get(data?.uid).pipe(
              map(userObj =>  userObj.data())
            );
          }
          else {
            return of(null);
          }
      })
    )
  }
// gatCompnayName(){
//   return from(this.companiesCollection.doc())
// }

  get(id: string){
    return from(this.companiesCollection.doc<CompanyData>(id).get());
  }
  getCompany(id: string){
    return from(this.companiesCollection.doc<CompanyData>(id).valueChanges());
  }

  create(company: CompanyData){
  return from(this.companiesCollection.doc(company.uid).set(company));
  }

  update(profile: CompanyData){
    return from(this.companiesCollection.doc(profile.uid).update({...profile}));
  }

  delete(id: string){
    return from(this.companiesCollection.doc(id).delete());
  }
}

interface CompanyData {
  uid?: string,
  companyName?: string,
  email: string,
  phone?: number|undefined | null,
  url?:string,
  type?:string
}
