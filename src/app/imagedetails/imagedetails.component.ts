import { Component, OnInit } from '@angular/core';
import { FlickerService } from 'src/app/flicker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-imagedetails',
	templateUrl: './imagedetails.component.html',
	styleUrls: ['./imagedetails.component.css']
})
export class ImagedetailsComponent implements OnInit {
	public responseData;
	public name: any;
	public description: any;
	public rating: any;
	public checkoutForm;
	constructor(
		public flickerservice: FlickerService,
		public router: Router,
		private _route: ActivatedRoute,
		private formBuilder: FormBuilder
	) {
		this.checkoutForm = this.formBuilder.group({ name: '', description: '', rating: '' });
	}

	ngOnInit(): void {
		let imageId = this._route.snapshot.paramMap.get('id');
		console.log(imageId);
		this.flickerservice.getImageDetails(imageId).subscribe(
			data => {
				console.log(data);
				this.responseData = data['photo'];
				console.log(this.responseData);
			},
			error => {
				console.log('some error occured');
				console.log(error.errorMessage);
			}
		);
	}

	/*public addRating: any = (feedbackData) => {
		let data = {
			// imageId: this.responseData.id,
			name: this.name,
			description: this.description,
			rating: this.rating
		};

		console.log(feedbackData);

		this.flickerservice.addRating(data).subscribe(apiResponse => {
			console.log(apiResponse);

			if (apiResponse.status === 200) {
				this.flickerservice.setUserInfoInLocalStorage(apiResponse.data.userDetails);
				console.log(this.flickerservice.setUserInfoInLocalStorage);
				if (apiResponse.data.userDetails) {
					this.router.navigate(['/gallery']);
				} else {
				}
				error => {
					console.log('some error occured');
					console.log(error.errorMessage);
				};
				this.router.navigate(['/gallery']);
			}
		});
	};*/

	onSubmit = data => {
    let id = this._route.snapshot.paramMap.get('id');
    console.log(id);
		// Process checkout data here
    var getstorage = this.flickerservice.getUserInfoFromLocalstorage(id);
    console.log(getstorage);
    var finalData = [data];;
     
    if(getstorage){
      getstorage.forEach(item =>{
        var object = {name:item.name,description:item.description,rating:item.rating};
        finalData.push(object);
      });
    }
    console.log(finalData);
    this.flickerservice.setUserInfoInLocalStorage(finalData, id);
    this.router.navigate(['/gallery']);
		/*this.flickerservice.addRating(data).subscribe(apiResponse => {
			console.log(apiResponse);

			if (apiResponse.status === 200) {
				this.flickerservice.setUserInfoInLocalStorage(apiResponse.data.userDetails);
				console.log(this.flickerservice.setUserInfoInLocalStorage);
				if (apiResponse.data.userDetails) {
					this.router.navigate(['/gallery']);
				} else {
				}
				error => {
					console.log('some error occured');
					console.log(error.errorMessage);
				};
				this.router.navigate(['/gallery']);
			}
		});
		console.warn('Your order has been submitted', data);*/
	};
}
