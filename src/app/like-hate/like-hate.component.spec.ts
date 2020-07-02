import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeHateComponent } from './like-hate.component';

describe('LikeHateComponent', () => {
  let component: LikeHateComponent;
  let fixture: ComponentFixture<LikeHateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeHateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeHateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
