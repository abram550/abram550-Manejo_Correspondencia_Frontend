import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSucursalesComponent } from './crear-sucursales.component';

describe('CrearSucursalesComponent', () => {
  let component: CrearSucursalesComponent;
  let fixture: ComponentFixture<CrearSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
