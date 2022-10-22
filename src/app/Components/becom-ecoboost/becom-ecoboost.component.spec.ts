import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomEcoboostComponent } from './becom-ecoboost.component';

describe('BecomEcoboostComponent', () => {
  let component: BecomEcoboostComponent;
  let fixture: ComponentFixture<BecomEcoboostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomEcoboostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomEcoboostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
