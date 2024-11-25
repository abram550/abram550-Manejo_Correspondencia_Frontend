import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaymentTypeComponent } from './show-payment-type.component';

describe('ShowPaymentTypeComponent', () => {
  let component: ShowPaymentTypeComponent;
  let fixture: ComponentFixture<ShowPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPaymentTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
