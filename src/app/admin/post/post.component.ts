import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators ,FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { PostForm, PostsService } from 'src/app/posts.service';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as _moment from "moment";
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth.service';
import { Observable, take } from 'rxjs';
import { CompanyService } from 'src/app/company.service';
import { CdkStepperNext } from '@angular/cdk/stepper';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  constructor(private postsService:PostsService, private fb:FormBuilder,
    private router:Router ,private route:ActivatedRoute, private authService:AuthService,
    private companyService:CompanyService , private fireStore:AngularFirestore)
    { }
    disabled: boolean = true;
    skillsList: string[] = ['Web Development', 'C#', 'JS', 'C++', 'Java',
    'SQL','SoftWare','HardWare'];

form=this.fb.group({
name:this.fb.control('',Validators.required),
description:this.fb.control('',Validators.required),
skills:this.fb.control('skillsList',Validators.required),
// skills:this.fb.control(`['one', 'two', 'three', 'four', 'five',]`),
start:this.fb.control('',Validators.required),
end:this.fb.control('',Validators.required),
noOfTechs:this.fb.control(0,Validators.required),
companyName:this.fb.control('',Validators.required),
type:this.fb.control('',Validators.required)
})

ngOnInit(): void {
  this.authService.adminState$.pipe(take(1)).subscribe((data)=>{
    console.log(data?.uid);
    if(data?.uid){
      console.log('userCredetials from ng');
      this.companyService.getCompany(data?.uid).subscribe((user) => {
        this.form.patchValue({
          companyName:user?.companyName,
          type:user?.type
        })
      });
    }
  })
}

onSubmit(){

this.authService.adminState$.pipe(take(1)).subscribe((userCredetials)=>{
  console.log('userCredetials');
  if(userCredetials){
    this.postsService.createPost({
      name:this.form.value.name+'',
      description:this.form.value.description+'',
      skills:this.form.value.skills+'',
      // skills:this.fb.control(`['one', 'two', 'three', 'four', 'five',]`),
      start:this.form.value.start+'',
      end:this.form.value.end+'',
      noOfTechs:this.form.value.noOfTechs,
      appliedUsers:[],
      companyId:userCredetials.uid,
      companyName:this.form.value.companyName+'',
      type:this.form.value.type+''
    }).subscribe(()=>{
      this.router.navigate(['admin/activities'])
    })
  }
})

  }
}







