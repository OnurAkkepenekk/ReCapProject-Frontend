import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colors: Color[] = [];
  colorAddForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddColorFrom();
  }

  createAddColorFrom() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }
  add() {
    let colorModel = Object.assign({}, this.colorAddForm.value);
    if (this.colorAddForm.valid) {
      this.colorService.add(colorModel).subscribe((response) => {
        if (response.success) {
          this.toasterService.success('Color added', 'Success');
        }
      });
    } else {
      this.toasterService.error("Color didn't add", 'Error');
    }
  }
}
