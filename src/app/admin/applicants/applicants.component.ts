import { Component, Inject, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TitleStrategy } from '@angular/router';
import { map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AppliedUsers, PostsService } from 'src/app/posts.service';
import { UserService } from 'src/app/user.service';
import { DialogData } from '../activities/activities.component';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  applicants:any[]=[]
  users:any[]=[]
  approvedUsers: any[]=[]
  companyId:any=''
  constructor( private  dialog: MatDialog, private postsService:PostsService,
    private userService:UserService,
    private authService:AuthService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit(): void {
  this.postsService.getApprovedApplicant(this.data.activityId).subscribe((userData)=>{
  this.approvedUsers=userData
    console.log(userData)
})
      this.postsService.getPostAppliedUsers(this.data.activityId).subscribe((posts)=>{
      this.applicants=posts
      })
}

onApprove(user:AppliedUsers){
  console.log(user.id,'from on approve');

  user.isApproved=true
  this.postsService.approveApplicant(user,this.data.activityId).subscribe(()=>{
  console.log(this.data.activityId);
  })
}
onReject(user:AppliedUsers){
  this.postsService.deleteAppliedUser(user.id, user.actvitiyId).subscribe(()=>{
    console.log('user deleted');

  })
}
}
