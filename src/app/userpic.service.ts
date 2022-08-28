import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserpicService {

  constructor(private fireStorage:AngularFireStorage, private authService:AuthService) { }

  uploadImage(image: File){
    const  filePath = `$'profile_images/${image.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    const uploadTask = this.fireStorage.upload(filePath,image);
    return uploadTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL()
        .subscribe((data)=> {
          this.authService.personState$.subscribe((person)=>{
            if(person){
              person?.updateProfile({
                photoURL:data
              })
            }
          })
        })
      })
    )
  }
}
