import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIngredientComponent } from './home-ingredient.component';

describe('HomeIngredientComponent', () => {
  let component: HomeIngredientComponent;
  let fixture: ComponentFixture<HomeIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
