import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyVoulnteeringComponent } from './why-voulnteering.component';

describe('WhyVoulnteeringComponent', () => {
  let component: WhyVoulnteeringComponent;
  let fixture: ComponentFixture<WhyVoulnteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyVoulnteeringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyVoulnteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
