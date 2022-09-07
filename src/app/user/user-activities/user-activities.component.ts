import { Component, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostForm, PostsService } from 'src/app/posts.service';
import { UserApplyComponent } from '../user-apply/user-apply.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, observable, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { CompanyService } from 'src/app/company.service';
import { TitleStrategy } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

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
    private companyService:CompanyService,private authService:AuthService) {
//   this.postsService.getPosts(companyId).subscribe((data)=>{
//   this.userPosts.data=data
//   console.log(data);

// })
  }

  searchText$ = new Subject<string>();
  query$: Observable<PostForm[]> = this.searchText$.pipe(
    tap((data)=> console.log(data,'from tab')),
    switchMap((input)=> {
      return this.postsService.getAllPosts()

      .pipe(
        map((posts)=> {
          if(!input) return posts;
          console.log(posts, 'before filter');
          return posts.filter((post)=> {
            let filterCondition = (!input || !(input.length > 0)  ||
            (post.skills?.toLocaleLowerCase().includes(input)) ||
            (post.start?.toLowerCase().includes(input)));
            console.log(filterCondition)
            // return this.userPosts.data.push(post)
            return filterCondition;
          })
        }),
        catchError(()=>  of([]))
        )
      }
      )
      )


  searchInput:string=''
  posts:string[]=[]

  ngOnInit(): void {
    this.query$.subscribe((data)=> {
      this.userPosts.data = data;
    })
  // this.postsService.getAllPosts().subscribe((data)=>{
  // this.userPosts.data=data.filter((data)=>{
  //   if(!this.searchText$){
  //     return data
  //   }
  //   else{
  //     console.log(data);

  //     return data.name?.includes(this.searchInput)
  //   }
  // })
//   console.log(data);

// })
// console.log(this.posts);

    // setTimeout(()=> this.searchText$.next(''),100);
  }
  companyId:string|undefined=''
  openDialog(id:string) {
    const dialogRef = this.dialog.open(UserApplyComponent, {
      data: {activityId: id}
    });
    // console.log(id);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  search(input: any){
    console.log(input);
    this.searchText$.next(input as string);
  }
}
export interface DialogData {
  activityId: string
}
