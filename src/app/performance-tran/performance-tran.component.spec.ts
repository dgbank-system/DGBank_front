import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTranComponent } from './performance-tran.component';

describe('PerformanceTranComponent', () => {
  let component: PerformanceTranComponent;
  let fixture: ComponentFixture<PerformanceTranComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceTranComponent]
    });
    fixture = TestBed.createComponent(PerformanceTranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
