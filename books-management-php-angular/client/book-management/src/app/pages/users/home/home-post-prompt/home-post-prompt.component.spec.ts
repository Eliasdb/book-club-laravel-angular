import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePostPromptComponent } from './home-post-prompt.component';

describe('HomePostPromptComponent', () => {
  let component: HomePostPromptComponent;
  let fixture: ComponentFixture<HomePostPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePostPromptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePostPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
