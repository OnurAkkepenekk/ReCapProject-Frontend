import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/CarDTO';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cars: CarDetail;
  dataLoaded:boolean=false;
  constructor(private carDetailService: CarDetailService) {}

  ngOnInit(): void {
    this.getCarByCarId(1);
  }

  getCarByCarId(carId: number) {
    this.carDetailService.getCarByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      console.log(response.data);
      console.log(this.cars);
      this.dataLoaded=true;
    });
  }
}
