import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-profile-settings-form',
  template: `
   <ul class="nav nav-tabs">
      <li class="nav-item"><a class="active nav-link">Settings</a></li>
      <li class="nav-item"><a class="nav-link">Edit</a></li>
    </ul>
    <div class="tab-content pt-3">
      <div class="tab-pane active">
        <form class="form" novalidate="">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col"> 
                  <div class="form-group">
                    <label>Full Name</label>
                    <input class="form-control" type="text" name="name" placeholder="Elias De Bock" value="">
                  </div>
                </div>
                <div class="col">
                    <div class="form-group">
                    <label>Type</label>
                    <input class="form-control" type="text" name="type" placeholder="Individual or business" value="">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col"> 
                  <div class="form-group">
                    <label>Address</label>
                    <input class="form-control" type="text" name="address" placeholder="Lijnendraaierstraat 13" value="">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>City</label>
                    <input class="form-control" type="text" name="city" placeholder="Gent" value="">
                  </div>
                </div>
              </div>
                <div class="row">
                <div class="col"> 
                  <div class="form-group">
                    <label>Postal code</label>
                    <input class="form-control" type="text" name="postalCode" placeholder="9900" value="">
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Province</label>
                    <input class="form-control" type="text" name="province" placeholder="Oost-Vlaanderen" value="">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Email</label>
                    <input class="form-control" type="text" placeholder="elias.db3@gmail.com">
                  </div>
                </div>
              </div>
              <!-- <div class="row">
                <div class="col mb-3">
                  <div class="form-group">
                    <label>About</label>
                    <textarea class="form-control" rows="5" placeholder="My Bio"></textarea>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-12 col-sm-6 mb-3">
              <div class="mb-2"><b>Change Password</b></div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Current Password</label>
                    <input class="form-control" type="password" placeholder="••••••">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>New Password</label>
                    <input class="form-control" type="password" placeholder="••••••">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                    <input class="form-control" type="password" placeholder="••••••"></div>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-5 offset-sm-1 mb-3">
              <div class="mb-2"><b>Keeping in Touch</b></div>
              <div class="row">
                <div class="col">
                  <label>Email Notifications</label>
                  <div class="custom-controls-stacked px-2">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="notifications-blog" checked="">
                      <label class="custom-control-label" for="notifications-blog">Blog posts</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="notifications-news" checked="">
                      <label class="custom-control-label" for="notifications-news">Newsletter</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="notifications-offers" checked="">
                      <label class="custom-control-label" for="notifications-offers">Personal Offers</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="row">
            <div class="col d-flex justify-content-end">
              <button class="browse-btn" type="submit">Save Changes</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  `,
  styleUrls: ['./profile-settings-form.component.scss']
})
export class ProfileSettingsFormComponent {

}
