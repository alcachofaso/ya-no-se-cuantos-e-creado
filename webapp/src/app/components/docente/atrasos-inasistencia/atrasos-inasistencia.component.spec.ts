import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrasosInasistenciaComponent } from './atrasos-inasistencia.component';

describe('AtrasosInasistenciaComponent', () => {
  let component: AtrasosInasistenciaComponent;
  let fixture: ComponentFixture<AtrasosInasistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrasosInasistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrasosInasistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
