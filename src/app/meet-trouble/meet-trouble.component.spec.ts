import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetTroubleComponent } from './meet-trouble.component';

describe('MeetTroubleComponent', () => {
  let component: MeetTroubleComponent;
  let fixture: ComponentFixture<MeetTroubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetTroubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetTroubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
