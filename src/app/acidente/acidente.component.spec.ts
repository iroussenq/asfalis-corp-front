import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcidenteComponent } from './acidente.component';

describe('AcidenteComponent', () => {
  let component: AcidenteComponent;
  let fixture: ComponentFixture<AcidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
