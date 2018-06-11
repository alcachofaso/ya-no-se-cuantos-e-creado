import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteMensajeCursoComponent } from './docente-mensaje-curso.component';

describe('DocenteMensajeCursoComponent', () => {
  let component: DocenteMensajeCursoComponent;
  let fixture: ComponentFixture<DocenteMensajeCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteMensajeCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteMensajeCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
