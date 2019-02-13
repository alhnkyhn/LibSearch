import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationDetailPage } from './application-detail';

@NgModule({
  declarations: [
    ApplicationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationDetailPage),
  ],
})
export class ApplicationDetailPageModule {}
