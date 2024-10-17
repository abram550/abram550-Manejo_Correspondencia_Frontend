import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoUsuarioComponent } from './actualizar-tipo-usuario.component';

describe('ActualizarTipoUsuarioComponent', () => {
  let component: ActualizarTipoUsuarioComponent;
  let fixture: ComponentFixture<ActualizarTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTipoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
