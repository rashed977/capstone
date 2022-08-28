import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/auth.service';
import { NgopicService } from 'src/app/ngopic.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
isShown:boolean=true

  constructor(public authService:AuthService, private router:Router,
    private ngopic:NgopicService, private toast:HotToastService) { }

  ngOnInit(): void {
  }
toggle(){
  this.isShown=!this.isShown
}
adminLogout(){
this.authService.adminSignOut().subscribe(()=>{
this.router.navigate([''])
})
}
submit( event: Event){
  const input = <HTMLInputElement> event.target;
  const obj = input?.files?.[0] as File;
  this.ngopic.uploadImage(obj)
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
