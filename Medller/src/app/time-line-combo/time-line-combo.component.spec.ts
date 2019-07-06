import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineComboComponent } from './time-line-combo.component';

describe('TimeLineComboComponent', () => {
  let component: TimeLineComboComponent;
  let fixture: ComponentFixture<TimeLineComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
