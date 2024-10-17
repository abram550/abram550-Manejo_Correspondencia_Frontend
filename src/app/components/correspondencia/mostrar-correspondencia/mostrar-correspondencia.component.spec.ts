import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCorrespondenciaComponent } from './mostrar-correspondencia.component';

describe('MostrarCorrespondenciaComponent', () => {
  let component: MostrarCorrespondenciaComponent;
  let fixture: ComponentFixture<MostrarCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
