import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCorrespondenciaComponent } from './crear-correspondencia.component';

describe('CrearCorrespondenciaComponent', () => {
  let component: CrearCorrespondenciaComponent;
  let fixture: ComponentFixture<CrearCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
