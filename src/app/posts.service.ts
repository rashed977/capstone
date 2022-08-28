import { Injectable } from '@angular/core';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private contactCollection:CollectionReference<DocumentData>
  private postsCollection:CollectionReference<DocumentData>
  constructor(private fireStore:Firestore) {
    this.postsCollection=collection(this.fireStore,'posts'),
    this.contactCollection=collection(this.fireStore,'contact')
  }

  getPosts():Observable<PostForm[]>{
    return collectionData(this.postsCollection,{idField:'id'})as Observable<PostForm[]>
  }
  createPost(post:PostForm){
    return addDoc(this.postsCollection,post)
  }
  delete(id:string){
    const docReference = doc(this.fireStore,'posts/'+id);
    return deleteDoc(docReference);
  }
  contact(contact:Contact){
    return addDoc(this.contactCollection,contact)
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
