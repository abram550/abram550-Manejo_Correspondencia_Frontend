import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCorrespondenciaComponent } from './eliminar-correspondencia.component';

describe('EliminarCorrespondenciaComponent', () => {
  let component: EliminarCorrespondenciaComponent;
  let fixture: ComponentFixture<EliminarCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarCorrespondenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
