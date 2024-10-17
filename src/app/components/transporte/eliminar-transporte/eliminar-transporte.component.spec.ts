import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTransporteComponent } from './eliminar-transporte.component';

describe('EliminarTransporteComponent', () => {
  let component: EliminarTransporteComponent;
  let fixture: ComponentFixture<EliminarTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
