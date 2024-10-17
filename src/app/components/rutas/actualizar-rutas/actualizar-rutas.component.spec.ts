import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRutasComponent } from './actualizar-rutas.component';

describe('ActualizarRutasComponent', () => {
  let component: ActualizarRutasComponent;
  let fixture: ComponentFixture<ActualizarRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
