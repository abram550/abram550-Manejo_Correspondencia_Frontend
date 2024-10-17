import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoCorrespondenciaComponent } from './crear-tipo-correspondencia.component';

describe('CrearTipoCorrespondenciaComponent', () => {
  let component: CrearTipoCorrespondenciaComponent;
  let fixture: ComponentFixture<CrearTipoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
