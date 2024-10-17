import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSucursalesComponent } from './actualizar-sucursales.component';

describe('ActualizarSucursalesComponent', () => {
  let component: ActualizarSucursalesComponent;
  let fixture: ComponentFixture<ActualizarSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
