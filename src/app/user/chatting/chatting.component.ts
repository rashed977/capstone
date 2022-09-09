import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { ChatService } from 'src/app/chat.service';
import { PersonData, UserService } from 'src/app/user.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  constructor(private userService:UserService, private chatService:ChatService) { }
  myChats$ = this.chatService.myChats$


  user$ = this.userService.isLoggedInUserPerson$
  user=this.userService.personState$
  searchControl=new FormControl();

  users$ = combineLatest([this.userService.getUsers(),this.user$,
    this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([users,user,searchString])=>

      users.filter(u=> u.personName?.includes(searchString)) )
    )

  ngOnInit(): void {
  }
  createChat(otherUser:PersonData){
    this.chatService.createChat(otherUser).subscribe((data)=>{

      console.log(data);
    }


    )
  }

}
