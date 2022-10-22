import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestributorsComponent } from './destributors.component';

describe('DestributorsComponent', () => {
  let component: DestributorsComponent;
  let fixture: ComponentFixture<DestributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestributorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
