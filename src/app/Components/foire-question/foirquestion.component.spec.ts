import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoirquestionComponent } from './foirquestion.component';

describe('FoirquestionComponent', () => {
  let component: FoirquestionComponent;
  let fixture: ComponentFixture<FoirquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoirquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoirquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
