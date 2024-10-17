import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEstadoCorrespondenciaComponent } from './eliminar-estado-correspondencia.component';

describe('EliminarEstadoCorrespondenciaComponent', () => {
  let component: EliminarEstadoCorrespondenciaComponent;
  let fixture: ComponentFixture<EliminarEstadoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarEstadoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEstadoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
