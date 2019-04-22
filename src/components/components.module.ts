import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import { DisplayMapComponent } from './display-map/display-map';
@NgModule({
	declarations: [GoogleMapComponent,
    DisplayMapComponent],
	imports: [],
	exports: [GoogleMapComponent,
    DisplayMapComponent]
})
export class ComponentsModule {}
