import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkspaceRoutes } from './workspace.routes';

@NgModule({
  imports: [RouterModule.forChild(WorkspaceRoutes)],
})
export class WorkspaceModule {}
