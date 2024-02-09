import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule],
  selector: 'app-profile-settings-form',
  template: ``,
  styleUrls: ['./profile-settings-form.component.scss'],
})
export class ProfileSettingsFormComponent {}
