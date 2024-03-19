import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountfFormComponent } from './accountf-form.component';

describe('AccountfFormComponent', () => {
  let component: AccountfFormComponent;
  let fixture: ComponentFixture<AccountfFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountfFormComponent]
    });
    fixture = TestBed.createComponent(AccountfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
