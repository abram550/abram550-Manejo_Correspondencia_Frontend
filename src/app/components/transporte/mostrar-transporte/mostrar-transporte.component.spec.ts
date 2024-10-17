import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTransporteComponent } from './mostrar-transporte.component';

describe('MostrarTransporteComponent', () => {
  let component: MostrarTransporteComponent;
  let fixture: ComponentFixture<MostrarTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
