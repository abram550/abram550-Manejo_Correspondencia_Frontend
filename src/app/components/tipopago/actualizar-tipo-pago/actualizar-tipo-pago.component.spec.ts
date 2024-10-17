import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoPagoComponent } from './actualizar-tipo-pago.component';

describe('ActualizarTipoPagoComponent', () => {
  let component: ActualizarTipoPagoComponent;
  let fixture: ComponentFixture<ActualizarTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTipoPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
