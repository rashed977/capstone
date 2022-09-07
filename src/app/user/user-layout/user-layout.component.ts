import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import { UserpicService } from 'src/app/userpic.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  isShown:boolean=true

  constructor(public authService:AuthService, private router:Router,
    private toast:HotToastService, private userpic:UserpicService,
    public userService:UserService) { }

  ngOnInit(): void {
  }
toggle(){
  this.isShown=!this.isShown
}
personLogout(){
this.authService.personSignOut().subscribe(()=>{
this.router.navigate([''])
})}

submit( event: Event){
  const input = <HTMLInputElement> event.target;
  const obj = input?.files?.[0] as File;
  this.userpic.uploadImage(obj)
  .pipe(
    this.toast.observe({
      loading:'Uploading Image ...',
      success:'Image Saved',
      error:(error)=>'This error Haappened: '+error
    })
  )
  .subscribe()

}

}
