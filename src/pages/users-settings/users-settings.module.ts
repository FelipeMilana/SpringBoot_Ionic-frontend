import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersSettingsPage } from './users-settings';

@NgModule({
  declarations: [
    UsersSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersSettingsPage),
  ],
})
export class UsersSettingsPageModule {}
