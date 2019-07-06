import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineControllerComponent } from './timeline-controller.component';

describe('TimelineControllerComponent', () => {
  let component: TimelineControllerComponent;
  let fixture: ComponentFixture<TimelineControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
