import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44369/api/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(
      this.apiUrl + 'brands/getall'
    );
  }
  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/GetByBrandId?brandId=' + brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }
  addBrand(brand: Brand) {
    return this.httpClient.post<SingleResponseModel<Brand>>(
      this.apiUrl + 'brands/add',
      brand
    );
  }
  update(brand: Brand) {
    return this.httpClient.post<SingleResponseModel<Brand>>(
      this.apiUrl + 'brands/update',
      brand
    );
  }
}
