import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoCorrespondenciaComponent } from './actualizar-tipo-correspondencia.component';

describe('ActualizarTipoCorrespondenciaComponent', () => {
  let component: ActualizarTipoCorrespondenciaComponent;
  let fixture: ComponentFixture<ActualizarTipoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTipoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
