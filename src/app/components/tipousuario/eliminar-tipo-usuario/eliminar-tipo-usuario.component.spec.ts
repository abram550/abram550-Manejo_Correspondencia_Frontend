import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoUsuarioComponent } from './eliminar-tipo-usuario.component';

describe('EliminarTipoUsuarioComponent', () => {
  let component: EliminarTipoUsuarioComponent;
  let fixture: ComponentFixture<EliminarTipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTipoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
