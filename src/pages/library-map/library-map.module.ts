import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibraryMapPage } from './library-map';

@NgModule({
  declarations: [
    LibraryMapPage,
  ],
  imports: [
    IonicPageModule.forChild(LibraryMapPage),
  ],
})
export class LibraryMapPageModule {}
