import { Component, OnInit } from '@angular/core';
import { PostForm, PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
cards:PostForm[]=[]
  constructor(private postsService:PostsService) {
    this.postsService.getPosts().subscribe((data)=>{
      this.cards=data;
    })
  }

  ngOnInit(): void {
  }

}
