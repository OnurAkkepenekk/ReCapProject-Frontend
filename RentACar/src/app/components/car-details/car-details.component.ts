import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/CarDTO';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  baseUrl = 'https://localhost:44369';
  carImages: CarImage[];
  cars: CarDetail[];
  dataLoaded = false;
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  //  Id'ye göre ımages
  getCarImagesByCarId(CarId: number) {
    this.carImageService.getImagesByCarId(CarId).subscribe((response) => {
      this.carImages = response.data;
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
}
