import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoVehiculoComponent } from './actualizar-tipo-vehiculo.component';

describe('ActualizarTipoVehiculoComponent', () => {
  let component: ActualizarTipoVehiculoComponent;
  let fixture: ComponentFixture<ActualizarTipoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTipoVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
