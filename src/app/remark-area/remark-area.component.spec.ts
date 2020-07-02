import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkAreaComponent } from './remark-area.component';

describe('RemarkAreaComponent', () => {
  let component: RemarkAreaComponent;
  let fixture: ComponentFixture<RemarkAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarkAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
