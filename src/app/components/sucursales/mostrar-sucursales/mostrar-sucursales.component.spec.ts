import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarSucursalesComponent } from './mostrar-sucursales.component';

describe('MostrarSucursalesComponent', () => {
  let component: MostrarSucursalesComponent;
  let fixture: ComponentFixture<MostrarSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
