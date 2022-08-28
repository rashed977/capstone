import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  constructor(private fB:FormBuilder,private contactService : PostsService,
    private router:Router) { }

  ngOnInit(): void {
  }
contact=this.fB.group({
  name:this.fB.control('',Validators.required),
  email:this.fB.control('',[Validators.required,Validators.email]),
  description:this.fB.control('',Validators.required)
})
onSubmit(){
  console.log(this.contact.value);
  let contSubmit=this.contact.value as Contact;
  this.contactService.contact(contSubmit).then(()=>{
    this.navigate()
  })
}
navigate(){
  this.router.navigate(['landingg/stories'])
}
}
export interface Contact{
  name:string,
  email:string,
  description:string
}
