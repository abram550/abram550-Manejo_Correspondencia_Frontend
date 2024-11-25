import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVehicleTypeComponent } from './display-vehicle-type.component';

describe('DisplayVehicleTypeComponent', () => {
  let component: DisplayVehicleTypeComponent;
  let fixture: ComponentFixture<DisplayVehicleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayVehicleTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
