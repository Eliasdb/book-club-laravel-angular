import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostsContainerComponent } from './home-posts-container.component';

describe('HomePostsContainerComponent', () => {
  let component: HomePostsContainerComponent;
  let fixture: ComponentFixture<HomePostsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePostsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
