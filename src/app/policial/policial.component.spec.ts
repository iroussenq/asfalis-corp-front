import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicialComponent } from './policial.component';

describe('PolicialComponent', () => {
  let component: PolicialComponent;
  let fixture: ComponentFixture<PolicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
