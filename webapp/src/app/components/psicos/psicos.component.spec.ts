import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicosComponent } from './psicos.component';

describe('PsicosComponent', () => {
  let component: PsicosComponent;
  let fixture: ComponentFixture<PsicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
