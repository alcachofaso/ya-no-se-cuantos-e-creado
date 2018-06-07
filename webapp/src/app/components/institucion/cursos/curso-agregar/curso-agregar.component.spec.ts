import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAgregarComponent } from './curso-agregar.component';

describe('CursoAgregarComponent', () => {
  let component: CursoAgregarComponent;
  let fixture: ComponentFixture<CursoAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
