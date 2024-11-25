import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTipoCorrespondenciaComponent } from './show-correspondence-type.component';

describe('MostrarTipoCorrespondenciaComponent', () => {
  let component: MostrarTipoCorrespondenciaComponent;
  let fixture: ComponentFixture<MostrarTipoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTipoCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTipoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
