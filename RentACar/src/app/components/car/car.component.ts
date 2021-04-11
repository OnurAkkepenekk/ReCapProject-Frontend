import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/CarDTO';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'], 
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsWithDetails: CarDetail[] = [];
  carsFilter: CarDetail[] = [];
  colors: Color[] = [];
  brands: Brand[] = [];
  dataLoaded = false;
  filterText = '';
  selectedColor: number;
  selectedBrand: number;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private carDetailService: CarDetailService,
    private cartService: CartService,
    private toastrService:ToastrService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByFilter(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        console.log(params['brandId']);
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        console.log(params['colorId']);
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
        this.getColors();
        this.getBrands();
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      console.log(response);
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getCarsByFilter(brandId: number, colorId: number) {
    this.carDetailService
      .getCarsByFilter(brandId, colorId)
      .subscribe((response) => {
        this.carsFilter = response.data;
        this.dataLoaded = true;
        console.log(response.data);
      });
  }
  addToCart(car:Car){
    console.log(car);
    if(car.carId===3){
      this.toastrService.error(car.carName,"Error");
    }
    else{
    console.log(car);

      this.toastrService.success(car.carName,"add to cart");
      this.cartService.addToCart(car);
    }
  }
}
