import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AppliedUsers, PostForm, PostsService } from 'src/app/posts.service';
import { DialogData, UserActivitiesComponent } from '../user-activities/user-activities.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-apply',
  templateUrl: './user-apply.component.html',
  styleUrls: ['./user-apply.component.css']
})
export class UserApplyComponent implements OnInit {

  // @Input() appliedActivities:PostForm[]|any=[];
  appliedUsers:AppliedUsers[]=[];
  appliedPosts:PostForm[]|any=[]
  skillsList: string[] = ['Web Development', 'C#', 'JS', 'C++', 'Java',
  'SQL','SoftWare','HardWare'];
  userName:string|undefined=''
  userId:string|undefined=''
  constructor(private fb :FormBuilder,
    private postsService:PostsService,private authService:AuthService,
    private userService:UserService, private toast:HotToastService, private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {

  }

  apply=this.fb.group({
    name:[''],
    isApproved:[false],
    skill:[!this.skillsList,Validators.required],
    comment:['',Validators.required],
    start:['',Validators.required],
    end:['',Validators.required]
  })

  onApply(){
    this.authService.personState$.pipe(take(1)).pipe(
      this.toast.observe({
        loading:'Applying ...',
        success:'Applied',
        error:(error)=>'This error Happened: '+error
      })
    ).subscribe((userCredetials)=>{
      if(userCredetials){

        // console.log(userCredetials.uid)
          this.postsService.userApply(this.data.activityId,{
            id:userCredetials.uid,
            isApproved:this.apply.value.isApproved,
            name:this.apply.value.name+'',
            skill:this.apply.value.skill+'',
            comment:this.apply.value.comment+'',
            start:this.apply.value.start+'',
            end:this.apply.value.end+'',
        })
    }
    this.postsService.getpost(this.data.activityId).pipe(take(1)).subscribe((posts)=>{
      if(posts)
      this.userService.createApply(userCredetials?.uid,posts).subscribe((data)=>{
        console.log(data);

      })
    this.router.navigate(['user/applied-activities'])
    })


    })
  }

  ngOnInit(): void {
    console.log(this.appliedPosts);

    this.authService.personState$.pipe(take(1)).subscribe((data)=>{
      // console.log(data?.uid);
      if(data?.uid){

        this.userService.getUser(data?.uid).subscribe((user) => {
          this.apply.patchValue({
            name:user?.personName
          })
        });
      }
    })
  }
  disable(){
    return true
  }

}
