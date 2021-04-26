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
  carId: number;

  returnDate: Date;
  rentDate: Date;

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
        this.carId = params['carId'];
        this.getRentalDetails(this.carId);
      } else if (params['rentDate'] && params['carId']) {
        this.isValidForDate(params['rentDate'], params['carId']);
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
    });
  }
  returnDateCheck(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
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
  isValidForDate(rentDate: Date, carId: number) {
    this.rentalService
      .checkAvailability(rentDate, carId)
      .subscribe((response) => {
        this.isCarRentable = response.success;
        if (this.isCarRentable == true) {
          this.dataLoaded = true;
        } else {
          this.dataLoaded = false;
        }
      });
  }
}
