import { Injectable } from '@angular/core';
import { AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsCollection:AngularFirestoreCollection<PostForm>
  private contactCollection:AngularFirestoreCollection<Contact>;
  currentAdminActivities$:Observable<PostForm[] | null | undefined>

  constructor(private fireStore:AngularFirestore, private authService:AuthService) {

    this.postsCollection=this.fireStore.collection('posts')
    this.contactCollection=this.fireStore.collection('contact')


    this.currentAdminActivities$=this.authService.adminState$.pipe(

      switchMap((data)=>{
        if(data){
          return this.getPosts(data?.uid);
        }
        else{
          return of(null)
        }
      })
    )
  }

  // getPosts(companyId:string){
  //   // return collectionData(this.postsCollection,{idField:'id'})as Observable<PostForm[]>
  //   return from(this.postsCollection.valueChanges())
  //   }

  getAllPosts(){
    return this.fireStore.collection<PostForm>('posts').valueChanges({'idField':'id'}) as Observable<PostForm[]>
    }
  getPosts(companyId:string){
    return this.fireStore.collection<PostForm>('posts',ref=> ref.where('companyId','==', companyId)
    ).valueChanges({'idField':'id'}) as Observable<PostForm[]>
    }

  userApply(id:string, newPost:AppliedUsers){
    return from(this.fireStore.collection<PostForm>('posts').doc(id).collection('appliedUsers').add(newPost));
  }
  getPostAppliedUsers(id: string){
    return from(this.fireStore.collection<PostForm>('posts').doc(id).collection<AppliedUsers>('appliedUsers').valueChanges());
  }
  // getPostAppliedUsers(){
  //   return from(this.fireStore.collection<AppliedUsers>('appliedUsers').valueChanges({'idField':'id'}));
  // }

  createPost(post:PostForm){
    // return addDoc(this.postsCollection,post)
    return from(this.postsCollection.add(post))
  }

  // deletePost(id:string){
    // const docReference = doc(this.fireStore,'posts/'+id);
    // const docReference = this.postsCollection.doc(id).delete()
    // console.log(from(this.postsCollection.doc(id).delete()))
    // return from(this.postsCollection.doc(id).delete());
  // }
  deletePost(id:string){
    const docReference = this.postsCollection.doc(id).delete()
    return from(docReference);
  }
  contact(contact:Contact){
    return from(this.contactCollection.add(contact))
  }
}

export interface PostForm{
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
  appliedUsers?:AppliedUsers[]
}

export interface AppliedUsers{
  id:string,
  name:string,
  skill:string|null|undefined,
  comment:string,
  start:string,
  end:string
}

export interface Contact{
  name:string,
  email:string,
  description:string
}
