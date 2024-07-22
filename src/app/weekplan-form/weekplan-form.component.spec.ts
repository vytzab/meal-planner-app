import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekplanFormComponent } from './weekplan-form.component';

describe('WeekplanFormComponent', () => {
  let component: WeekplanFormComponent;
  let fixture: ComponentFixture<WeekplanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekplanFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekplanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
