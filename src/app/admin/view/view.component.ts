import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take, map, filter, Observable, Subject, switchMap, debounceTime } from 'rxjs';
import { PostForm } from 'src/app/posts.service';
import { PersonData, UserService } from 'src/app/user.service';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],

})
export class ViewComponent implements OnInit {

  constructor(private userService:UserService) {
  }

  searchText$ = new Subject<string>();
  query$?: Observable<PersonData[]> = this.searchText$
  .pipe(
    switchMap((input)=> {
      return this.userService.getUsers()
      .pipe(
        map((users)=> {
          if(!input) return users;
          console.log(users, 'before filter');
          return users.filter((user)=> {
            let filterCondition = (!input || !(input.length > 0)  ||
            (user.skills?.toLowerCase().includes(input)) ||
            (user.city?.toLowerCase().includes(input)) ||
            (user.personName?.toLowerCase().includes(input)));
            console.log(filterCondition)
            return filterCondition;
          })
        }))
      }))

  searchInput:string=''


  ngOnInit(): void {
    setTimeout(()=> this.searchText$.next(''),100);
  }
  search(input: any){
    console.log(input);
    this.searchText$.next(input as string);

  }

}

