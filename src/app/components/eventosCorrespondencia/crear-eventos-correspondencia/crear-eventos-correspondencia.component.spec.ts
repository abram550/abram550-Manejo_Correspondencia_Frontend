import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventosCorrespondenciaComponent } from './crear-eventos-correspondencia.component';

describe('CrearEventosCorrespondenciaComponent', () => {
  let component: CrearEventosCorrespondenciaComponent;
  let fixture: ComponentFixture<CrearEventosCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEventosCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEventosCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
