import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './_modules/shared.module';
import { SortBarComponent } from './pages/books/books-sort-bar/books-sort-bar.component';
import { ChangePhotoComponent } from './pages/profile/change-photo/change-photo.component';
import { ProfileSettingsFormComponent } from './pages/profile/profile-settings-form/profile-settings-form.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    HeaderComponent,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
