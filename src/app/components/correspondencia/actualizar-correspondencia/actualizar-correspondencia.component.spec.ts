import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCorrespondenciaComponent } from './actualizar-correspondencia.component';

describe('ActualizarCorrespondenciaComponent', () => {
  let component: ActualizarCorrespondenciaComponent;
  let fixture: ComponentFixture<ActualizarCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
