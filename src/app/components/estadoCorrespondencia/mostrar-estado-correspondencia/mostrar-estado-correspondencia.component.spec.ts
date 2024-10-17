import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEstadoCorrespondenciaComponent } from './mostrar-estado-correspondencia.component';

describe('MostrarEstadoCorrespondenciaComponent', () => {
  let component: MostrarEstadoCorrespondenciaComponent;
  let fixture: ComponentFixture<MostrarEstadoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEstadoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarEstadoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
