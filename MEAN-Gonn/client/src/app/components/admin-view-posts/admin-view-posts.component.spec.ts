import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPostsComponent } from './admin-view-posts.component';

describe('AdminViewPostsComponent', () => {
  let component: AdminViewPostsComponent;
  let fixture: ComponentFixture<AdminViewPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
