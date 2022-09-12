import { Injectable } from '@angular/core';
import {from, map, of, switchMap} from 'rxjs'
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { AppliedUsers, PostForm } from './posts.service';
import { collection, collectionData, doc, docData, } from '@angular/fire/firestore';
import { query } from 'express';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// for chat
  get currentUserProfile$(): Observable<PersonData | null> {
    return this.authService.personState$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = this.firestore.collection('persons').doc(user?.uid)
        return from(ref.valueChanges()) as Observable<PersonData|null>
      })
    );
  }
//**************************************************************************** */
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
    return this.personsCollection.valueChanges({'idField':'id'}) as Observable<PersonData[]>
    }
  // get AllUsers$(): Observable<PersonData[]> {
  //   // const ref = collection(this.firestore,'persons')
  //   const ref= this.firestore.collection('persons')
  //   return ref.valueChanges() as Observable<PersonData[]>
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
// getAppliedPosts(id:string){
//   return from(this.personsCollection.doc(id).collection<PostForm>)
// }
  createApply(id:string|undefined,post:AppliedPosts){
    return from(this.firestore.collection<PersonData>('persons').doc(id)
    .collection<AppliedPosts>('appliedPosts').add(post))
  }
  getAppliedPosts(id:string|undefined){
    return this.firestore.collectionGroup<AppliedUsers>('appliedUsers',
    ref =>  ref.where("userId", "==", id)).valueChanges();
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
  appliedPosts?:string[]|any,
}
// export interface ProfileUser {
//   uid: string,
//   personName?: string,
//   email: string,
//   phone?: number|undefined | null,
//   city?:string,
//   skills?:any|null|undefined,
//   experience?:string,
//   courses?:string,
//   start?:string,
//   end?:string,
//   appliedPosts?:string[]|any,
// }

export interface AppliedPosts{
  id?:string,
  companyId:string,
  name:string,
  description:string,
  noOfTechs:number|null|undefined,
  skills?:string|null|undefined,
  start:string,
  end:string,
  companyName?:string|null|undefined,
  type?:string|null|undefined,
}

