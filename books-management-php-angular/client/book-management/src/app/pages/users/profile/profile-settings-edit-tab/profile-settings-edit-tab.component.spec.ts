import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsEditTabComponent } from './profile-settings-edit-tab.component';

describe('ProfileSettingsEditTabComponent', () => {
  let component: ProfileSettingsEditTabComponent;
  let fixture: ComponentFixture<ProfileSettingsEditTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSettingsEditTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSettingsEditTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
