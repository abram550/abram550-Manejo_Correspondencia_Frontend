import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBranchesComponent } from './update-branches.component';

describe('UpdateBranchesComponent', () => {
  let component: UpdateBranchesComponent;
  let fixture: ComponentFixture<UpdateBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBranchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
