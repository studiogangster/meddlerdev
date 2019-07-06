import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficInspectorComponent } from './traffic-inspector.component';

describe('TrafficInspectorComponent', () => {
  let component: TrafficInspectorComponent;
  let fixture: ComponentFixture<TrafficInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficInspectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
