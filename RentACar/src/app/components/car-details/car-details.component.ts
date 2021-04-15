import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/CarDTO';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  baseUrl = 'https://localhost:44369';
  carImages: CarImage[];
  cars: CarDetail[];
  rentals: Rental[];
  dataLoaded = false;
  isCarRentable = false;
  carId:number;
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.carId=params['carId'];
        this.getRentalDetails(this.carId);
      }
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getRentalDetails(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      this.rentals = response.data;
      console.log(this.isCarRentable);
      this.returnDateCheck(this.rentals);
      console.log(this.isCarRentable);
    });
  }
  returnDateCheck(rental: Rental[]) {
    let date: Date = new Date();
    console.log(date);
    if (rental[0].returnDate.toString() < date.toJSON().toString()) {
      this.isCarRentable = true;
    }
  }
  setClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  getCarByCarId(carId: number) {
    this.carDetailService.getCarByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      console.log(response);
      this.dataLoaded = true;
    });
  }
  getCurrentImageClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'carousel-item active ';
    } else {
      return 'carousel-item';
    }
  }
}
