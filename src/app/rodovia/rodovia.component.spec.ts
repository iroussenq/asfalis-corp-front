import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodoviaComponent } from './rodovia.component';

describe('RodoviaComponent', () => {
  let component: RodoviaComponent;
  let fixture: ComponentFixture<RodoviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RodoviaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RodoviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
