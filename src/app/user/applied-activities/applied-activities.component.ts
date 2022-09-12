import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TitleStrategy } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AppliedUsers, PostForm, PostsService } from 'src/app/posts.service';
import { UserService } from 'src/app/user.service';
import { DialogData } from '../user-activities/user-activities.component';
import { UserApplyComponent } from '../user-apply/user-apply.component';


@Component({
  selector: 'app-applied-activities',
  templateUrl: './applied-activities.component.html',
  styleUrls: ['./applied-activities.component.css']
})
export class AppliedActivitiesComponent implements OnInit {
  posts:MatTableDataSource<AppliedUsers>=new MatTableDataSource<AppliedUsers>([]);
  constructor(private postsService:PostsService,private userService:UserService,
    private authService:AuthService)
    {  }

    displayedColumns:string[] = ["name","description","start","end","skills",'status'];
  ngOnInit(): void {
    // this.posts=this.postsService.appliedPosts
    // console.log(this.posts);
    this.authService.personState$.pipe(take(1)).subscribe((userCredentials)=>{
      console.log(userCredentials?.uid);
      this.userService.getAppliedPosts(userCredentials?.uid).pipe(take(1))
      .subscribe((data)=>{
        // this.postsService.getpost()

        console.log(data);
        this.posts.data=data

        this.postsService
      })
    })
console.log(this.posts,'fromTable');
  }
}
