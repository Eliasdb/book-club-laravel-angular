import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSpaceRoutes } from './adminspace.routes';

@NgModule({
  imports: [RouterModule.forChild(AdminSpaceRoutes)],
})
export class AdminSpaceModule {}
