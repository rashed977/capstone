import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private fb :FormBuilder, private toast:HotToastService,
    private userService:UserService, private authService:AuthService,
    private fireStore:AngularFirestore) { }



  skills:string[]=['Web Development', 'C#', 'JS', 'C++', 'Java',
  'SQL','SoftWare','HardWare'];

  cities:string[]=['Amman','Irbid','Jarash','Aqaba','Salt'];

  personForm = this.fb.group({
    email:['',[Validators.email,Validators.required]],
    personName:['',[Validators.required]],
    phone:this.fb.control(0,[Validators.required]),
    skills:this.fb.control('skills',[Validators.required]),
    // skills:[!this.skills,[Validators.required]],
    city:['cities',[Validators.required]],
    experience:[''],
    courses:['courses',[Validators.required]],
    start:['',[Validators.required]],
    end:['',[Validators.required]]
  });


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  courses: Course[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.courses.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(course: Course): void {
    const index = this.courses.indexOf(course);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
  ngOnInit(): void {
    this.userService.personState$?.subscribe((profile)=>{
      if(profile){
        this.personForm.setValue({
          email:profile.email+'',
          personName:profile.personName+'',
          phone:profile.phone??0,
          skills:profile.skills+'',
          city:profile.city+'',
          experience:profile.experience+'',
          courses:profile.courses+'',
          start:profile.start+'',
          end:profile.end+''
        })
      }
    })
  }

  saveForm(){
    this.authService.personState$.pipe(
      switchMap(person=>this.userService.update({
        uid:person?.uid,
        email:this.personForm.value.email+'',
        personName:this.personForm.value.personName+'',
        phone:this.personForm.value.phone,
        skills:this.personForm.value.skills,
        city:this.personForm.value.city+'',
        experience:this.personForm.value.experience+'',
        courses:this.personForm.value.courses+'',
        start:this.personForm.value.start+'',
        end:this.personForm.value.end+'',
      })),
      this.toast.observe({
        loading:'Saving Profile ...',
        success:'Saved',
        error:(error)=> 'Error Happened '+error
      })
    ).subscribe(()=>{
      console.log('update done...');
      // console.log(this.companyService.adminState$ );

    })
    }
}

export interface Course {
  name: string;
}
