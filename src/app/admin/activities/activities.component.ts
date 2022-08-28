import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as firebase from 'firebase/compat';
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
  posts:MatTableDataSource<PostForm>=new MatTableDataSource<PostForm>([]);
  displayedColumns:string[] = ["name","description","start","end","tech no.","skills",
  "applicants","delete"];

  constructor(private postsService:PostsService, private  dialog: MatDialog
    ) {

    this.postsService.getPosts().subscribe((data)=>{
      this.posts.data=data;
    })
  }
  ngOnInit(): void {
  }
  deletePost(id:string){
    this.postsService.delete(id).then(()=>{
      alert('Post Was Deleted');
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(ApplicantsComponent);
    console.log(this.posts);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}






