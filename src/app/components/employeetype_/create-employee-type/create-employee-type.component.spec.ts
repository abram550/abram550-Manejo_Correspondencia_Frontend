import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoEmpleadoComponent } from './create-employee-type.component';

describe('CrearTipoEmpleadoComponent', () => {
  let component: CrearTipoEmpleadoComponent;
  let fixture: ComponentFixture<CrearTipoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
