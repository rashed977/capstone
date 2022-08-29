import { Injectable } from '@angular/core';
import { AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private contactCollection:AngularFirestoreCollection<Contact>
  private postsCollection:AngularFirestoreCollection<PostForm>

  constructor(private fireStore:AngularFirestore, private authService:AuthService) {
    this.postsCollection=this.fireStore.collection('posts'),
    this.contactCollection=this.fireStore.collection('contact')
  }

  getPosts(){
    // return collectionData(this.postsCollection,{idField:'id'})as Observable<PostForm[]>
    return from(this.postsCollection.get())

    }


  createPost(post:PostForm){
    // return addDoc(this.postsCollection,post)
    return from(this.postsCollection.add(post))
  }
  delete(id:string){
    // const docReference = doc(this.fireStore,'posts/'+id);
    const docReference = this.postsCollection.doc(id).delete();
    return from(docReference);
  }
  contact(contact:Contact){
    return from(this.contactCollection.add(contact))
  }
}
// export interface Skills{
//   one:string,
//   two:string,
//   three:string
// }
export interface PostForm{
  id?:string,
  name:string,
  description:string,
  noOfTechs:number,
  skills:string[],
  start:string,
  end:string,

}
export interface Contact{
  name:string,
  email:string,
  description:string
}
