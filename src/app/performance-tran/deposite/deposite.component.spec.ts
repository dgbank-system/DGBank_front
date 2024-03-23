import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeComponent } from './deposite.component';

describe('DepositeComponent', () => {
  let component: DepositeComponent;
  let fixture: ComponentFixture<DepositeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositeComponent]
    });
    fixture = TestBed.createComponent(DepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
