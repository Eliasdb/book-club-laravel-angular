import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavouritesTabComponent } from './profile-favourites-tab.component';

describe('ProfileFavouritesTabComponent', () => {
  let component: ProfileFavouritesTabComponent;
  let fixture: ComponentFixture<ProfileFavouritesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFavouritesTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileFavouritesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
