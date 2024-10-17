import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRutasComponent } from './eliminar-rutas.component';

describe('EliminarRutasComponent', () => {
  let component: EliminarRutasComponent;
  let fixture: ComponentFixture<EliminarRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
