import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePaymentTypeComponent } from './update-payment-type.component';

describe('UpdatePaymentTypeComponent', () => {
  let component: UpdatePaymentTypeComponent;  // Component instance
  let fixture: ComponentFixture<UpdatePaymentTypeComponent>;  // Test fixture for the component

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePaymentTypeComponent]  // Importing the component to test
    })
    .compileComponents();  // Compile the components and modules

    fixture = TestBed.createComponent(UpdatePaymentTypeComponent);  // Create the test fixture for the component
    component = fixture.componentInstance;  // Get the component instance
    fixture.detectChanges();  // Trigger change detection to update the component
  });

  // Test to ensure the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();  // Check if the component instance is truthy (i.e., created successfully)
  });
});
