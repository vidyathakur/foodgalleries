import { Component, OnInit } from '@angular/core';
import { FlickerService } from 'src/app/flicker.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
	title = 'flickerImages';
	public galleryImage;
	constructor(public flickerservice: FlickerService, public http: HttpClient, private router: Router) {}

	public imageDetails(id) {
    console.log(id);
		this.router.navigate(['imagedetails', id]);
	}

	ngOnInit() {
		this.flickerservice.getGalleryImage().subscribe(
			data => {
				if (data.stat == 'ok') {
					var arrayData = [];
          var photos = data.photos.photo;
          photos.forEach((item,key) => {
            var object = item;
            if(this.flickerservice.getUserInfoFromLocalstorage(item.id)){
              var ratings = this.flickerservice.getUserInfoFromLocalstorage(item.id);
              var total_rat = [];
              ratings.forEach(item1 => {
                total_rat.push(parseInt(item1.rating));
              })
              var sum = total_rat.reduce(function(a, b) {	return a + b;}, 0);
              object.user_rating = sum;
              arrayData.push(object);
            } else {
              object.user_rating = 0;
				      arrayData.push(object);
            }
          });
					this.galleryImage = arrayData;
				}
			},
			err => {
				console.log('some error occured');
				console.error(err);
			}
		);
	}
}
