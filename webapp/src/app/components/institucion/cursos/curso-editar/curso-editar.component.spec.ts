import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEditarComponent } from './curso-editar.component';

describe('CursoEditarComponent', () => {
  let component: CursoEditarComponent;
  let fixture: ComponentFixture<CursoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
