import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarComponent,
  },
  {
    path: 'cars',
    component: CarComponent,
  },
  {
    path: 'cars/brand/:brandId',
    component: CarComponent,
  },
  {
    path: 'cars/color/:colorId',
    component: CarComponent,
  },
  {
    path: 'cars/filter/:brandId/:colorId',
    component: CarComponent,
  },
  {
    path: 'cars/carDetails/:carId',
    component: CarDetailsComponent,
  },
  {
    path: 'cars/rentals',
    component: RentalComponent,
  },
  {
    path: 'rentals/:carId',
    component: PaymentComponent,
  },

  {
    path: 'cars/add',
    component: CarAddComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate:[LoginGuard]
  },

  {
    path: 'cars/update/:carId',
    component: CarUpdateComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'colors/update/:id',
    component: ColorUpdateComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'brands/update/:brandId',
    component: BrandUpdateComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
