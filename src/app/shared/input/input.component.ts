import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input()
  label!: string;
  @Input()
  control!: AbstractControl | null;
  @Input() inputType!: string;

  constructor() {}

  ngOnInit(): void {}

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  showErrors() {
    const { dirty, touched, errors } = this.convertToFormControl(this.control);
    return dirty && touched && errors;
  }
}
