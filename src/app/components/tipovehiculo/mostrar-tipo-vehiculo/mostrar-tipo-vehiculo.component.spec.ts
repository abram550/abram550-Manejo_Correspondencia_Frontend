import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTipoVehiculoComponent } from './mostrar-tipo-vehiculo.component';

describe('MostrarTipoVehiculoComponent', () => {
  let component: MostrarTipoVehiculoComponent;
  let fixture: ComponentFixture<MostrarTipoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTipoVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTipoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
