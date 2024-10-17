import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSucursalesComponent } from './eliminar-sucursales.component';

describe('EliminarSucursalesComponent', () => {
  let component: EliminarSucursalesComponent;
  let fixture: ComponentFixture<EliminarSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
