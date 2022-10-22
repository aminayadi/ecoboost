import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPersoComponent } from './card-perso.component';

describe('CardPersoComponent', () => {
  let component: CardPersoComponent;
  let fixture: ComponentFixture<CardPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPersoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
