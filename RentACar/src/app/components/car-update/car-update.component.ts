import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/CarDTO';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: Car;
  carDetail: CarDetail[];
  carImages: CarImage[];
  baseUrl = 'https://localhost:44369';
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUpdateCarFrom();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  createUpdateCarFrom() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [Validators.required],
      brandId: [Validators.required],
      colorId: [Validators.required],
      modelYear: [Validators.required],
      dailyPrice: [Validators.required],
      descriptions: [Validators.required],
    });
  }

  getCarByCarId(carId: number) {
    this.carService.getCarWithDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
      console.log(response);
      this.carUpdateForm.setValue({
        carId: this.carDetail[0].id,
        colorId: this.carDetail[0].colorId,
        brandId: this.carDetail[0].brandId,
        modelYear: this.carDetail[0].modelYear,
        dailyPrice: this.carDetail[0].dailyPrice,
        descriptions: this.carDetail[0].description,
      });
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
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
  getCurrentImageClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'carousel-item active ';
    } else {
      return 'carousel-item';
    }
  }
  update() {
    let carModel = Object.assign({}, this.carUpdateForm.value);

    carModel.brandId = parseInt(carModel.brandId);
    carModel.colorId = parseInt(carModel.colorId);

    if (this.carUpdateForm.valid) {
      this.carService.update(carModel).subscribe(
        (response) => {
          if (response.success) {
            console.log(response);
            this.toasterService.success('Car updated successfully');
          }
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.error.Errors.length > 0) {
            console.log(responseError.error.Errors);
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toasterService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası");
            }
          }
        }
      );
    } else {
      this.toasterService.error('Not add car!!!!', 'Error');
    }
  }
}
