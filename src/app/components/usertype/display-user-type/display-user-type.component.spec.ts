import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserTypeComponent } from './display-user-type.component';

describe('DisplayUserTypeComponent', () => {
  let component: DisplayUserTypeComponent;
  let fixture: ComponentFixture<DisplayUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayUserTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
