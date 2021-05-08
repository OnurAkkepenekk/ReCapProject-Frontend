import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  carAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toasterService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getColorOptions();
    this.getBrandOptions();
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      descriptions: ['', Validators.required],
      carName: ['', Validators.required],
    });
  }

  add() {
    let carModel = Object.assign({}, this.carAddForm.value);
    carModel.brandId = parseInt(carModel.brandId);
    carModel.colorId = parseInt(carModel.colorId);

    if (this.carAddForm.valid) {
      this.carService.add(carModel).subscribe(
        (response) => {
          if (response.success) {
            this.toasterService.success('Car added successfully');
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

  getColorOptions() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrandOptions() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(response);
    });
  }
}
