import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CarDetail } from '../models/CarDTO';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(car: Car) {
    let item = CartItems.find((c) => c.car.carId === car.carId);
    console.log(item);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
      console.log(cartItem);
    }
  }
  listCars(): CartItem[] {
    return CartItems;
  }
  removeFromCart(car: CarDetail) {
    let item: CartItem = CartItems.find((c) => c.car.carId === car.carId);
    CartItems.splice(CartItems.indexOf(item), 1);
  }
}
