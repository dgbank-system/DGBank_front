import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosTestComponent } from './scenarios-test.component';

describe('ScenariosTestComponent', () => {
  let component: ScenariosTestComponent;
  let fixture: ComponentFixture<ScenariosTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenariosTestComponent]
    });
    fixture = TestBed.createComponent(ScenariosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
