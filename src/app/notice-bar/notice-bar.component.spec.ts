import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBarComponent } from './notice-bar.component';

describe('NoticeBarComponent', () => {
  let component: NoticeBarComponent;
  let fixture: ComponentFixture<NoticeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
