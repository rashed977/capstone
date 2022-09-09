import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { concatMap, from, map, observable, Observable, take,of } from 'rxjs';
import { collectionGroup, Timestamp, where } from '@angular/fire/firestore';
import {  UserService } from './user.service';
import {  addDoc, collection,  collectionData,  doc,  docData,  Firestore,  query,  setDoc,
  updateDoc,} from '@angular/fire/firestore';
import { AppliedUsers } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private chatsCollection:AngularFirestoreCollection<PersonData>
  // private chatCollection:AngularFirestoreCollection<Chat>
  constructor(public firestore:AngularFirestore, private userService:UserService,
    // private fireStore:Firestore
    ) {
      // this.chatsCollection=this.firestore.collection('chats')
    }


    createChat(_otherUser: PersonData): Observable<string | null> {
  const ref = this.firestore.collection<Chat>('chats')
  return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap((_user) =>{
        console.log(_user);

          var chat = {
            users: [ _user, _otherUser],
            userIds: [_user?.uid+'', _otherUser?.uid+'']
          } as Chat;
          return from(ref.add(chat)).pipe(map(data=> data.id));
      }
      ),
      map(ref => ref)
    )
  }

  get myChats$(): Observable<Chat[]>{
    const ref = this.firestore.collection<Chat>('chats')
    return this.userService.currentUserProfile$.pipe(
      concatMap((_user) =>{

          return from(this.firestore.collection<Chat>('chats', ref =>
          ref.where('_userIds', 'array-contains', _user?.uid))
          .valueChanges({'idField':'id'}).pipe(
            map(chats => this.addChatName(_user?.uid ?? '', chats as Chat[]))
          ))
      }
      ),
    )
  }
  addChatName(currentUserId:string|undefined, chats: Chat[]): Chat[] {
    chats.forEach((chat:Chat) => {
      if(chat.userIds && chat.users){
      const otherIndex = chat.userIds.indexOf( currentUserId ?? '' ) === 0 ? 1:0 ;
      const personName = chat.users[otherIndex]
      chat.chatName = personName+''}
    })
    return chats;
  }
}
// return this.fireStore.collection<PostForm>('posts',ref=> ref.where('companyId','==', companyId)
// ).valueChanges({'idField':'id'}) as Observable<PostForm[]>
export interface Chat {
  id: string,
  lastMessage?: string,
  lastMessageDate?: Date & Timestamp,
  userIds?: string[] | undefined,
  users?: PersonData[] | undefined,


  chatPic?: string;
  chatName?: string;
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



