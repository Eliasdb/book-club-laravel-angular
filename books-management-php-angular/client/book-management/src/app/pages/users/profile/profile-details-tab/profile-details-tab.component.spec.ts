import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsDetailTabComponent } from './profile-settings-detail-tab.component';

describe('ProfileSettingsDetailTabComponent', () => {
  let component: ProfileSettingsDetailTabComponent;
  let fixture: ComponentFixture<ProfileSettingsDetailTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSettingsDetailTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSettingsDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
