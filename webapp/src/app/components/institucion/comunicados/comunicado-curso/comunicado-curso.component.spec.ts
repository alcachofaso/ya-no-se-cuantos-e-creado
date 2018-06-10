import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoCursoComponent } from './comunicado-curso.component';

describe('ComunicadoCursoComponent', () => {
  let component: ComunicadoCursoComponent;
  let fixture: ComponentFixture<ComunicadoCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadoCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
