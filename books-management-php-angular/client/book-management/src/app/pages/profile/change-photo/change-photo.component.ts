import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-change-photo',
  template: `
  <div class="row">
    <div class="col-12 col-sm-auto mb-3">
        <div class="mx-auto" style="width: 140px;">
        <div class="d-flex justify-content-center align-items-center rounded" style="height: 140px; background-color: rgb(233, 236, 239);">
            <span style="color: rgb(166, 168, 170); font: bold 8pt Arial;">140x140</span>
        </div>
        </div>
    </div>
    <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
        <div class="text-center text-sm-left mb-2 mb-sm-0">
        <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">Elias De Bock</h4>
        <div class="mt-2">
            <button class="btn btn-primary change-btn" type="button">
            <i class="fa fa-fw fa-camera"></i>
            <span style="margin-left: 5px;">Change Photo</span>
            </button>
        </div>
        </div>
        <div class="text-center text-sm-right">
        <span class="badge badge-secondary" style="background-color:lightgreen;color:black;">member</span>
        <div class="text-muted"><small>Joined 22 Jan 2024</small></div>
        </div>
    </div>
</div>
`,
  styleUrls: ['./change-photo.component.scss']
})
export class ChangePhotoComponent {

}
