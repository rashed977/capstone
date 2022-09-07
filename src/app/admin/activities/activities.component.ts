import { Component, OnInit } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as firebase from 'firebase/compat';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import {PostsService,PostForm } from 'src/app/posts.service';
import { ApplicantsComponent } from '../applicants/applicants.component';
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {

  posts:MatTableDataSource<PostForm>=new MatTableDataSource<PostForm>(this.activities);

  displayedColumns:string[] = ["name","description","start","end","tech no.","skills",
  "applicants","delete"];

  constructor(private postsService:PostsService, private  dialog: MatDialog
    , public authService:AuthService) {  }

    activities ?:PostForm[]

    ngOnInit(): void {

    this.authService.adminState$.subscribe((userCredentials)=>{
      this.postsService.currentAdminActivities$?.subscribe((data)=>{
        this.activities = data?.filter((value)=>{
          return value.companyId==userCredentials?.uid
        })
        console.log(this.activities,'from activities');
        this.posts.data=this.activities ?? [];
      })
    })

    // console.log(this.activities,'from posts');

  }
  deletePost(id: string){
    this.postsService.deletePost(id).subscribe(()=>{
    alert('Post Was Deleted');
    })
  }

  openDialog(id:string) {
    const dialogRef = this.dialog.open(ApplicantsComponent,
      {
        data: {activityId: id}
      });
    console.log(id);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface DialogData {
  activityId: string
}





