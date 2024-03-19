import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountfDetailsComponent } from './accountf-details.component';

describe('AccountfDetailsComponent', () => {
  let component: AccountfDetailsComponent;
  let fixture: ComponentFixture<AccountfDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountfDetailsComponent]
    });
    fixture = TestBed.createComponent(AccountfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
