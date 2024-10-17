import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoPagoComponent } from './crear-tipo-pago.component';

describe('CrearTipoPagoComponent', () => {
  let component: CrearTipoPagoComponent;
  let fixture: ComponentFixture<CrearTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
