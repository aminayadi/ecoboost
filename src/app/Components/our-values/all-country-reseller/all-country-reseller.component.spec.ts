import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCountryResellerComponent } from './all-country-reseller.component';

describe('AllCountryResellerComponent', () => {
  let component: AllCountryResellerComponent;
  let fixture: ComponentFixture<AllCountryResellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCountryResellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCountryResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
