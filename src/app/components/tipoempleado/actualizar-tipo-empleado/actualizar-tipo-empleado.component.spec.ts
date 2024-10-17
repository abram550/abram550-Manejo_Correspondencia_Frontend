import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoEmpleadoComponent } from './actualizar-tipo-empleado.component';

describe('ActualizarTipoEmpleadoComponent', () => {
  let component: ActualizarTipoEmpleadoComponent;
  let fixture: ComponentFixture<ActualizarTipoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTipoEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
