import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinventoryComponent } from './myinventory.component';

describe('MyinventoryComponent', () => {
  let component: MyinventoryComponent;
  let fixture: ComponentFixture<MyinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyinventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
