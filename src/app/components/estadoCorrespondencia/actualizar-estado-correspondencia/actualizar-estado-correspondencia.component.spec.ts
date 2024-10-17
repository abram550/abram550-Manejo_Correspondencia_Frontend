import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEstadoCorrespondenciaComponent } from './actualizar-estado-correspondencia.component';

describe('ActualizarEstadoCorrespondenciaComponent', () => {
  let component: ActualizarEstadoCorrespondenciaComponent;
  let fixture: ComponentFixture<ActualizarEstadoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarEstadoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEstadoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
