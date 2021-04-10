import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetail } from '../models/CarDTO';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44369/api/';

  constructor(private httpClient: HttpClient) {}
  getCarsByFilter(brandId: number, colorId: number) {
    let newPath =
      this.apiUrl +
      'cars/GetCarDetailsByColorAndBrand?brandId=' +
      brandId +
      '&colorId=' +
      colorId;

    console.log(newPath);
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarByCarId(carId: number) {
    let newPath = this.apiUrl + 'cars/getcardetailsByCarId?carId=' + carId;
    console.log(newPath);
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }
}
