import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsFormComponent } from './profile-settings-form.component';

describe('ProfileSettingsFormComponent', () => {
  let component: ProfileSettingsFormComponent;
  let fixture: ComponentFixture<ProfileSettingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSettingsFormComponent]
    });
    fixture = TestBed.createComponent(ProfileSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
