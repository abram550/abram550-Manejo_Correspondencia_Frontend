import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPagosComponent } from './actualizar-pagos.component';

describe('ActualizarPagosComponent', () => {
  let component: ActualizarPagosComponent;
  let fixture: ComponentFixture<ActualizarPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
