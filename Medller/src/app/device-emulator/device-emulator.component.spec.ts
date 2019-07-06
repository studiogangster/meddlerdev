import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEmulatorComponent } from './device-emulator.component';

describe('DeviceEmulatorComponent', () => {
  let component: DeviceEmulatorComponent;
  let fixture: ComponentFixture<DeviceEmulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEmulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
