import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedActivitiesComponent } from './applied-activities.component';

describe('AppliedActivitiesComponent', () => {
  let component: AppliedActivitiesComponent;
  let fixture: ComponentFixture<AppliedActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
