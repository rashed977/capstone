import { Component, OnInit } from '@angular/core';
import { PostForm, PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-user-activities',
  templateUrl: './user-activities.component.html',
  styleUrls: ['./user-activities.component.css']
})
export class UserActivitiesComponent implements OnInit {
cards:PostForm[]=[];

  constructor(private postsService : PostsService) {
    this.postsService.getPosts().subscribe((data)=>{
      // this.cards=data;
    })
  }
  get(){
    console.log(this.cards);

  }
  ngOnInit(): void {
  }
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
