import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators ,FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { PostForm, PostsService } from 'src/app/posts.service';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as _moment from "moment";
import * as moment from 'moment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  // allForms:PostForm[]=[]

  constructor(private Forms:PostsService,private fb:FormBuilder,
    private router:Router,private route:ActivatedRoute ) { }

    skillsList: string[] = ['Web Development', 'C#', 'JS', 'C++', 'Java',
    'SQL','SoftWare','HardWare'];

@Output() form=this.fb.group({
name:this.fb.control('',Validators.required),
description:this.fb.control('',Validators.required),
skills:this.fb.control('skillsList'),
// skills:this.fb.control(`['one', 'two', 'three', 'four', 'five',]`),
start:this.fb.control(''),
end:this.fb.control(''),
noOfTechs:this.fb.control('',Validators.required)
})

ngOnInit(): void {
}

onSubmit(){

  let post=this.form.value as PostForm | any;
  this.Forms.createPost(post).then(()=>{
    // this.form.controls.start.setValue(moment(this.form.value.start).format('YYYY-MM-DD'));
    console.log(this.form.controls.start.value);

    this.navigateToList()
  })
}
navigateToList(){
this.router.navigate(['admin/activities']);
}


}





