import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficDataItemComponent } from './traffic-data-item.component';

describe('TrafficDataItemComponent', () => {
  let component: TrafficDataItemComponent;
  let fixture: ComponentFixture<TrafficDataItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficDataItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
