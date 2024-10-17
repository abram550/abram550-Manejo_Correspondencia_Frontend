import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoPagoComponent } from './eliminar-tipo-pago.component';

describe('EliminarTipoPagoComponent', () => {
  let component: EliminarTipoPagoComponent;
  let fixture: ComponentFixture<EliminarTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTipoPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
