import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPagosComponent } from './mostrar-pagos.component';

describe('MostrarPagosComponent', () => {
  let component: MostrarPagosComponent;
  let fixture: ComponentFixture<MostrarPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
