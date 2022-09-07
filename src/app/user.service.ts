import { Injectable } from '@angular/core';
import {from, map, of, switchMap} from 'rxjs'
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { PostForm } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public postsCollection:AngularFirestoreCollection<PostForm[]>
  public personsCollection: AngularFirestoreCollection<PersonData>;
  personState$? : Observable<PersonData | null | undefined>;
  isLoggedInUserPerson$ = this.authService.personState$.pipe(
    switchMap((userCredentials)=> {
      if(userCredentials){
          return this.personsCollection.doc(userCredentials.uid).get().pipe(
            switchMap((user)=> {
            // console.log(user, 'isLoggedInUseruser' );
            if(user.exists) return of(true);
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
    this.postsCollection=this.firestore.collection('posts');
    this.personsCollection = this.firestore.collection('persons');
    this.personState$ = this.authService.personState$
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
  getPosts(){
    return from(this.postsCollection.valueChanges())
  }
  getUsers(){
    return from(this.personsCollection.valueChanges())
  }

  // getUsersFiltered(search:string | null){
  //   return (this.firestore.collection('persons', ref=> {
  //     ref;
  //     if(search && search.length > 0){
  //       console.log('querying', search);
  //       let query =  ref
  //       .where('personName', '>=', search)
  //       .where('personName','>=', search); //search
  //       return query;
  //     }
  //     return ref;

  //   }) as AngularFirestoreCollection<PersonData>).valueChanges();
  // }

  get(id: string){
    return from(this.personsCollection.doc<PersonData>(id).get());
  }
  getUser(id:string){
    return from(this.personsCollection.doc(id).valueChanges())
  }
  create(person: PersonData){
  return from(this.personsCollection.doc(person.uid).set(person));
  }

  update(profile: PersonData){
    return from(this.personsCollection.doc(profile.uid).update({...profile}));
  }

  delete(id: string){
    return from(this.personsCollection.doc(id).delete());
  }
}

export interface PersonData {
  uid?: string,
  personName?: string,
  email: string,
  phone?: number|undefined | null,
  city?:string,
  skills?:any|null|undefined,
  experience?:string,
  courses?:string,
  start?:string,
  end?:string,
}



