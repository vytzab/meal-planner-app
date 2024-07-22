import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekplanListComponent } from './weekplan-list.component';

describe('WeekplanListComponent', () => {
  let component: WeekplanListComponent;
  let fixture: ComponentFixture<WeekplanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekplanListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
