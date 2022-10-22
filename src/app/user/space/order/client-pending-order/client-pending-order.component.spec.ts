import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPendingOrderComponent } from './client-pending-order.component';

describe('ClientPendingOrderComponent', () => {
  let component: ClientPendingOrderComponent;
  let fixture: ComponentFixture<ClientPendingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPendingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPendingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
