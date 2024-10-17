import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTipoEmpleadoComponent } from './mostrar-tipo-empleado.component';

describe('MostrarTipoEmpleadoComponent', () => {
  let component: MostrarTipoEmpleadoComponent;
  let fixture: ComponentFixture<MostrarTipoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTipoEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTipoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
