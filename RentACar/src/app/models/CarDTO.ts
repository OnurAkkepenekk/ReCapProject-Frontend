import { CarImage } from "./carImage";

export interface CarDetail {
  id: number;
  carName:string;
  brandId:number;
  brandName: string;
  colorId:number;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  imagePath: CarImage[];
  carId:number;
}
