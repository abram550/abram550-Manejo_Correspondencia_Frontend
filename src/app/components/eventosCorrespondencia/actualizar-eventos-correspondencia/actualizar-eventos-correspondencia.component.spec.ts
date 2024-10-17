import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEventosCorrespondenciaComponent } from './actualizar-eventos-correspondencia.component';

describe('ActualizarEventosCorrespondenciaComponent', () => {
  let component: ActualizarEventosCorrespondenciaComponent;
  let fixture: ComponentFixture<ActualizarEventosCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarEventosCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarEventosCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
