import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLibraryPage } from './add-library';

@NgModule({
  declarations: [
    AddLibraryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLibraryPage),
  ],
})
export class AddLibraryPageModule {}
