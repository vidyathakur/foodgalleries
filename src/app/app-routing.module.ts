import { GalleryComponent } from './gallery/gallery.component';
import { ImagedetailsComponent } from './imagedetails/imagedetails.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'imagedetails/:id', component:ImagedetailsComponent},
  {path:'gallery', component:GalleryComponent},
  {
		path: '**',
		redirectTo: 'gallery'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
