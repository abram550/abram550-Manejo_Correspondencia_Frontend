import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCorrespondenceTypeComponent } from './update-correspondence-type.component';

describe('UpdateCorrespondenceTypeComponent', () => {
  let component: UpdateCorrespondenceTypeComponent;
  let fixture: ComponentFixture<UpdateCorrespondenceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCorrespondenceTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCorrespondenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
