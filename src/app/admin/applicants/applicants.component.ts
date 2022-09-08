import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  approvedUsers:any[]=[]
  companyId:any=''
  constructor( private  dialog: MatDialog, private postsService:PostsService,
    private userService:UserService,
    private authService:AuthService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit(): void {
    // this.authService.adminState$.pipe(take(1)).subscribe((data)=>{
    //   this.companyId=data
    //   console.log(data?.uid);
    //   console.log(this.companyId.uid);
     // })

    this.postsService.getPostAppliedUsers(this.data.activityId).pipe(
      map((data)=>{
        data.forEach(data=>{
          this.userService.getUser(data.id).subscribe((user)=>{
            this.users.push(user)
            // console.log(user,'from push');

          })
        })
      })
    ).subscribe(()=>{
      console.log('users added');
    })
    console.log(this.applicants);



      this.postsService.getPostAppliedUsers(this.data.activityId).subscribe((posts)=>{
      // console.log(posts);
      this.applicants=posts
      })
    // })
}
onApprove(user:AppliedUsers){
  console.log(user,'from on approve');

  user.isApproved=true
  this.postsService.approveApplicant(user,this.data.activityId).subscribe((data)=>{

  })

}
}
