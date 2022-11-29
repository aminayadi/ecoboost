import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerMapComponent } from './reseller-map.component';

describe('OurValueComponent', () => {
  let component: ResellerMapComponent;
  let fixture: ComponentFixture<ResellerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
