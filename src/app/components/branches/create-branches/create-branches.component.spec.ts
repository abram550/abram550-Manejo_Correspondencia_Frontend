import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBranchesComponent } from './create-branches.component';

describe('CreateBranchesComponent', () => {
  let component: CreateBranchesComponent;
  let fixture: ComponentFixture<CreateBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBranchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
