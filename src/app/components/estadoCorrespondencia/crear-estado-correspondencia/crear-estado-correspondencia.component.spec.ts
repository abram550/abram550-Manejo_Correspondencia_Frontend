import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstadoCorrespondenciaComponent } from './crear-estado-correspondencia.component';

describe('CrearEstadoCorrespondenciaComponent', () => {
  let component: CrearEstadoCorrespondenciaComponent;
  let fixture: ComponentFixture<CrearEstadoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEstadoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEstadoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
