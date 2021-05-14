import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color: Color;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUpdateColorFrom();
    this.activatedRoute.params.subscribe((parameter) => {
    if (parameter['id']) {
        this.getColorById(parameter['id']);
      }
    });
  }

  getColorById(id: number) {
    this.colorService.getColorById(id).subscribe((response) => {
      this.color = response.data;
      console.log(response.data);
      this.colorUpdateForm.setValue({
        colorId: response.data.colorId,
        colorName: response.data.colorName,
      });
    });
  }
  createUpdateColorFrom() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      colorName: ['', Validators.required],
    });
  }
  update() {
    let carModel = Object.assign({}, this.colorUpdateForm.value);
    if (this.colorUpdateForm.valid) {
      this.colorService.update(carModel).subscribe(
        (response) => {
          if (response.success) {
            this.toasterService.success('Color updated successfully');
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
