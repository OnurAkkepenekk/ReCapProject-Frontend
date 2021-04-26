import { CarImage } from "./carImage";

export interface CarDetail {
  id: number;
  name:string;
  brandId:number;
  brandName: string;
  colorId:number;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  carImages: CarImage[];
  carId:number;
}
