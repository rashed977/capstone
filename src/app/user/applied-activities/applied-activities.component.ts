import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TitleStrategy } from '@angular/router';
import { PostForm, PostsService } from 'src/app/posts.service';
import { DialogData } from '../user-activities/user-activities.component';
import { UserApplyComponent } from '../user-apply/user-apply.component';


@Component({
  selector: 'app-applied-activities',
  templateUrl: './applied-activities.component.html',
  styleUrls: ['./applied-activities.component.css']
})
export class AppliedActivitiesComponent implements OnInit {
  posts:MatTableDataSource<PostForm>=new MatTableDataSource<PostForm>([]);
  constructor(private postsService:PostsService) {  }

  ngOnInit(): void {
    this.posts=this.postsService.appliedPosts
    console.log(this.posts);

  }

}
