import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEventosCorrespondenciaComponent } from './eliminar-eventos-correspondencia.component';

describe('EliminarEventosCorrespondenciaComponent', () => {
  let component: EliminarEventosCorrespondenciaComponent;
  let fixture: ComponentFixture<EliminarEventosCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarEventosCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEventosCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
