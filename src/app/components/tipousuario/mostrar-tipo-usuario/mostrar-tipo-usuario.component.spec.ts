import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTipoUsuarioComponent } from './mostrar-tipo-usuario.component';

describe('MostrarTipoUsuarioComponent', () => {
  let component: MostrarTipoUsuarioComponent;
  let fixture: ComponentFixture<MostrarTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTipoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
