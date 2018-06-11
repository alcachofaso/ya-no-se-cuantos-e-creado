import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteTareaTrabajoComponent } from './docente-tarea-trabajo.component';

describe('DocenteTareaTrabajoComponent', () => {
  let component: DocenteTareaTrabajoComponent;
  let fixture: ComponentFixture<DocenteTareaTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteTareaTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteTareaTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
