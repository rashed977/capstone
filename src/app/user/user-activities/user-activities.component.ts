import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostForm, PostsService } from 'src/app/posts.service';
import { UserApplyComponent } from '../user-apply/user-apply.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, observable, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { CompanyService } from 'src/app/company.service';
import { TitleStrategy } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-activities',
  templateUrl: './user-activities.component.html',
  styleUrls: ['./user-activities.component.css']
})
export class UserActivitiesComponent implements OnInit {
  userPosts : MatTableDataSource<PostForm>=new MatTableDataSource<PostForm>([]);
  displayedColumns:string[] = ["name","description","start","end","tech no.","skills",
  'apply'];

  constructor(private postsService:PostsService,public dialog: MatDialog,
    private companyService:CompanyService,private authService:AuthService,
    private fb :FormBuilder) { }

    posts?:Observable <PostForm[]>

  searchText$ = new Subject<string>();
  query$?: Observable<PostForm[]> = this.searchText$
  .pipe(
    switchMap((input)=> {
      return this.postsService.getAllPosts()
      .pipe(
        map((posts)=> {
          if(!input) return posts;
          console.log(posts, 'before filter');
          return posts.filter((post)=> {
            let filterCondition = (!input || !(input.length > 0)  ||
            (post.companyName?.includes(input)) ||
            // (post.skills?.includes(input)) ||
            (post.type?.includes(input)) ||
            (post.start?.includes(input)));
            console.log(filterCondition)
            return filterCondition;
          })
        }))
      }))

        searchInput:string=''


  ngOnInit(): void {
    // this.userPosts.data=this.query$
    console.log(this.posts);

    setTimeout(()=> this.searchText$.next(''),100);
  }


  // companyId:string|undefined=''
  openDialog(id:string) {
    const dialogRef = this.dialog.open(UserApplyComponent, {data: {activityId: id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);});
  }

  search(input: any){
    console.log(input);
    this.searchText$.next(input as string);
  }
}

export interface DialogData {
  activityId: string
}
