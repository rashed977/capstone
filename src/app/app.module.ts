import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landingg/landing-page/landing-page.component';
import { OppurtunitiesComponent } from './landingg/stories/oppurtunities.component';
import { WhyVoulnteeringComponent } from './landingg/why-voulnteering/why-voulnteering.component';
import { ActivitiesComponent } from './admin/activities/activities.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { PostComponent } from './admin/post/post.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ViewComponent } from './admin/view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { from } from 'rxjs';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ContactComponent } from './landingg/contact/contact.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ApplicantsComponent } from './admin/applicants/applicants.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SelectComponent } from './landingg/select/select.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AdminlogComponent } from './adminlog/adminlog.component';
import { UserlogComponent } from './userlog/userlog.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserApplyComponent } from './user/user-apply/user-apply.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import {MatStepperModule} from '@angular/material/stepper';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { UserRegistrationComponent } from './user-registration/user-registration.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    OppurtunitiesComponent,
    WhyVoulnteeringComponent,
    ActivitiesComponent,
    LayoutComponent,
    PostComponent,
    ProfileComponent,
    ViewComponent,
    ContactComponent,
    ApplicantsComponent,
    SelectComponent,
    AdminlogComponent,
    UserlogComponent,
    UserLayoutComponent,
    UserApplyComponent,
    UserProfileComponent,
    AdminRegistrationComponent,
    UserRegistrationComponent,




  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatCardModule,
    MatNativeDateModule,
    MatStepperModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    AngularFireStorageModule,
    // provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// provideFirebaseApp(() => initializeApp(environment.firebase)),
// provideFirestore(() => getFirestore())
