import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CompanyService } from 'src/app/company.service';
import { PostForm, PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
// companyForm:string[]=[]
  constructor(private postsService:PostsService,private fb :FormBuilder,
    private companyService:CompanyService, private authService:AuthService) {
    // this.postsService.getPosts().subscribe((data)=>{
      // this.cards=data;
    // })
  }
  types:string[]=['NGO','Government','Religious'];

  companyForm = this.fb.group({
    
  email:['',[Validators.email,Validators.required]],
  companyName:['',[Validators.required]],
  phone:this.fb.control(0,[Validators.required]),
  types:['types',[Validators.required]],
  url:['']
})
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
  ngOnInit(): void {
    this.companyService.adminState$?.subscribe((profile)=>{
      if(profile){
        this.companyForm.setValue({
          email:profile.email+'',
          companyName:profile.companyName+'',
          phone:profile.phone??0,
          types:profile.type+'',
          url:profile.url+'',
        })
      }
    })
  }
saveForm(){
this.authService.adminState$.pipe(
  switchMap(admin=>this.companyService.update({
    uid:admin?.uid,
    email:this.companyForm.value.email+'',
    companyName:this.companyForm.value.companyName+'',
    phone:this.companyForm.value.phone,
    type:this.companyForm.value.types+'',
    url:this.companyForm.value.url+'',
  }))
).subscribe(()=>{
  console.log('update done...');
  // console.log(this.companyService.adminState$ );

})
}
}
