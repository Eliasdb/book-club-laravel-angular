import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostItemComponent } from './home-post-item.component';

describe('HomePostItemComponent', () => {
  let component: HomePostItemComponent;
  let fixture: ComponentFixture<HomePostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePostItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
