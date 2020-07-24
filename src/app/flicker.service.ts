import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FlickerService {
	private url = 'https://www.flickr.com/services/rest/?method=';
	private key = '9c89bdbdec41c9d0f61987886c76cc76';
	private gallery_url = this.url +
		'flickr.galleries.getPhotos&api_key=' +
		this.key +
		'&gallery_id=72157715184052921&format=json&nojsoncallback=1';
	private image_details = this.url +
		'flickr.photos.getInfo&api_key=' +
		this.key +
		'&format=json&nojsoncallback=1&photo_id=';

	constructor(private http: HttpClient) {}

	public getUserInfoFromLocalstorage = (imageId) => {
		return JSON.parse(localStorage.getItem(imageId));
	}; // end getUserInfoFromLocalstorage

	public setUserInfoInLocalStorage = (data,imageid) => {
    console.log(data);
		localStorage.setItem(imageid, JSON.stringify(data));
	};

	public addRating(data): Observable<any> {
		const params = new HttpParams()
			.set('imageId', data.imageId)
			.set('name', data.name)
			.set('description', data.description)
			.set('rating', data.rating);
      //  console.log(this.gallery_url);
		return this.http.post(this.gallery_url, params);
    
	}

	getGalleryImage(): any {
    console.log(this.gallery_url);
		let response = this.http.get(this.gallery_url);
		return response;
	}

	getImageDetails(imageId): any {
		console.log(imageId);
		console.log(this.image_details + imageId);
		let response = this.http.get(this.image_details + imageId);
		return response;
	}
}
