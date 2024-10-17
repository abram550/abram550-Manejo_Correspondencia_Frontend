import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoCorrespondenciaComponent } from './eliminar-tipo-correspondencia.component';

describe('EliminarTipoCorrespondenciaComponent', () => {
  let component: EliminarTipoCorrespondenciaComponent;
  let fixture: ComponentFixture<EliminarTipoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTipoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTipoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
