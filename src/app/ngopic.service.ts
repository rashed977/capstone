import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NgopicService {

  constructor(private fireStorage:AngularFireStorage, private authService:AuthService) { }

  uploadImage(image: File){
    const  filePath = `$'profile_images/${image.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    const uploadTask = this.fireStorage.upload(filePath,image);
    return uploadTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL()
        .subscribe((data)=> {
          this.authService.adminState$.subscribe((admin)=>{
            if(admin){
              admin?.updateProfile({
                photoURL:data
              })
            }
          })
        })
      })
    )
  }
}
