import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { PostComponent } from './admin/post/post.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ViewComponent } from './admin/view/view.component';
import { AboutComponent } from './landingg/about/about.component';
import { ContactComponent } from './landingg/contact/contact.component';
import { LandingPageComponent } from './landingg/landing-page/landing-page.component';
import { OppurtunitiesComponent } from './landingg/stories/oppurtunities.component';
import { WhyVoulnteeringComponent } from './landingg/why-voulnteering/why-voulnteering.component';
import { SelectComponent } from './landingg/select/select.component';
import { AdminlogComponent } from './adminlog/adminlog.component';
import { UserlogComponent } from './userlog/userlog.component';
import { AuthGuard } from './auth.guard';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserActivitiesComponent } from './user/user-activities/user-activities.component';
import { UserApplyComponent } from './user/user-apply/user-apply.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AdminnotloggedGuard } from './adminnotlogged.guard';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UsernotloggedGuard } from './usernotlogged.guard';
import { UserGuard } from './user.guard';


const routes: Routes = [
  {path:'',redirectTo:'landingg/stories',  pathMatch:'full'},

  {path:'landingg',component:LandingPageComponent,children:[
  {path:'stories',component:OppurtunitiesComponent},
  {path:'why-volunteering',component:WhyVoulnteeringComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'select',component:SelectComponent},
]},

{path:'adminlog',component:AdminlogComponent},
{path:'userlog',component:UserlogComponent},
{path:'adminSignUp',component:AdminRegistrationComponent,canActivate:[AdminnotloggedGuard]},
{path:'userSignUp',component:UserRegistrationComponent,canActivate:[UsernotloggedGuard]},

  {path:'admin',component:LayoutComponent,canActivate:[AuthGuard],children:[
    {path:'post',component:PostComponent},
    {path:'activities',component:ActivitiesComponent},
    {path:'view',component:ViewComponent},
    {path:'profile',component:ProfileComponent},
  ]},

{path:'user',component:UserLayoutComponent,canActivate:[UserGuard],children:[
  {path:'user-activities',component:UserActivitiesComponent},
  {path:'user-apply',component:UserApplyComponent},
  {path:'user-profile',component:UserProfileComponent},


]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
