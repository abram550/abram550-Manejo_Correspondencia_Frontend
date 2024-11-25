import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeeTypeComponent } from './show-employee-type.component';

describe('ShowEmployeeTypeComponent', () => {
  let component: ShowEmployeeTypeComponent;
  let fixture: ComponentFixture<ShowEmployeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowEmployeeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEmployeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
