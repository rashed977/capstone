import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AppliedUsers, PostForm, PostsService } from 'src/app/posts.service';
import { DialogData, UserActivitiesComponent } from '../user-activities/user-activities.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-apply',
  templateUrl: './user-apply.component.html',
  styleUrls: ['./user-apply.component.css']
})
export class UserApplyComponent implements OnInit {

  appliedUsers:AppliedUsers[]=[];
  disabled: boolean = true;
  skillsList: string[] = ['Web Development', 'C#', 'JS', 'C++', 'Java',
  'SQL','SoftWare','HardWare'];
  userName:string|undefined=''
  userId:string|undefined=''
  constructor(private fb :FormBuilder,
    private postsService:PostsService,private authService:AuthService,
    private userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {

  }

  apply=this.fb.group({
    // name:[''],
    name:new FormControl({value:'',disabled: this.disabled}),
    skill:[!this.skillsList,Validators.required],
    comment:['',Validators.required],
    start:['',Validators.required],
    end:['',Validators.required]
  })

  onApply(){
    // console.log(this.data.activityId);
    this.authService.personState$.pipe(take(1)).subscribe((userCredetials)=>{
      if(userCredetials){

        console.log(userCredetials.uid)
          this.postsService.userApply(this.data.activityId,{
            id:userCredetials.uid,
            name:this.apply.value.name+'',
            skill:this.apply.value.skill+'',
            comment:this.apply.value.comment+'',
            start:this.apply.value.start+'',
            end:this.apply.value.end+'',
        })
    }
    })}
    // patchValue(){
    //   this.apply.patchValue({
    //     name:'ahmad'
    //   })
    // }

  ngOnInit(): void {
    this.authService.personState$.pipe(take(1)).subscribe((data)=>{
      console.log(data?.uid);
      // this.userId=data?.uid
      if(data?.uid){

        this.userService.getUser(data?.uid).subscribe((user) => {
          // console.log(user?.personName);
          // console.log(this.userName);
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
