import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEventosCorrespondenciaComponent } from './mostrar-eventos-correspondencia.component';

describe('MostrarEventosCorrespondenciaComponent', () => {
  let component: MostrarEventosCorrespondenciaComponent;
  let fixture: ComponentFixture<MostrarEventosCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarEventosCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarEventosCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
