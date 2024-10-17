import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRutasComponent } from './mostrar-rutas.component';

describe('MostrarRutasComponent', () => {
  let component: MostrarRutasComponent;
  let fixture: ComponentFixture<MostrarRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
