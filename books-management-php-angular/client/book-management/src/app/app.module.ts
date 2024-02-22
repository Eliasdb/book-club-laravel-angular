import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideQueryClientOptions } from '@ngneat/query';
import { provideQueryDevTools } from '@ngneat/query-devtools';
import { NgChartsModule } from 'ng2-charts';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LaravelSanctumTokenInterceptor } from './_interceptors/sanctum-token.interceptor';
import { SharedModule } from './_modules/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSpaceModule } from './pages/admin/adminspace/adminspace.module';
import { WorkspaceModule } from './pages/users/workspace/workspace.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    WorkspaceModule,
    AdminSpaceModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LaravelSanctumTokenInterceptor,
      multi: true,
    },
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          staleTime: 3000,
        },
      },
    }),
    provideQueryDevTools(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
