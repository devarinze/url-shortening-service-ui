import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit, OnChanges {
  @Input()
  label: string;
  @ViewChild('contentWrapper', {static: false}) contentWrapper;
  @ViewChild('append', {static: false}) append;
  isInfo: string;
  isAppend: string;
  @Input()
  isEditable = true;
  @Input()
  control: AbstractControl;
  @Input()
  isObject = false;
  @Input()
  value: string;
  @Input()
  currency: string;
  @Input()
  required: boolean;
  @Input()
  labelCls: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
