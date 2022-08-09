import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { Observable } from "rxjs";
//import { Store, select } from "@ngrx/store";

import { Order } from 'src/app/models/order';
import { OrderRoute } from "src/app/models/order-route";
import { OrderService } from "src/app/services/order.service";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Params } from "express-serve-static-core";
//import { GlobalState } from "src/app/store/states/global.state";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  colors: Array<ThemePalette> = [undefined, 'primary', 'warn'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orderRoutes: OrderRoute[] = [];
  form!: FormGroup;
  private mode: string = 'create';
  private orderId!: string;

  //need to change
  panelOpenState: boolean = false;
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  constructor(
    private titleServic: Title,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private orderService: OrderService,
    private notificationService: NotificationService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.titleServic.setTitle('Delivery Management System - Create Order');

    this.buildForm();
    this.ar.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.orderId = <string>paramMap.get('id');
      } else {
        this.mode = 'create';
        this.orderId = '';
      }
    })
  }

  private buildForm() {
    this.form = this.fb.group({
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required, Validators.pattern('^[0-9]{10}$')],
      senderEmail: ['', Validators.required, Validators.email],
      senderAddress: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverPhone: ['', Validators.required, Validators.pattern('^[0-9]{10}$')],
      receiverEmail: ['', Validators.required, Validators.email],
      receiverAddress: ['', Validators.required],
      //define fo routes //
      cost: ['', Validators.required],
      size: ['', Validators.required],
      orderValue: ['', Validators.required],
      tax: ['', Validators.required],
      total: ['', Validators.required],
      weight: ['', Validators.required],
      insurance: [false],
      note: ['']
    });
  }

  private setFormValue(order: Order) {
    this.form.setValue({
      senderName: order.senderName,
      senderPhone: order.senderPhone,
      senderEmail: order.senderEmail,
      senderAddress: order.senderAddress,
      receiverName: order.receiverName,
      receiverPhone: order.receiverPhone,
      receiverEmail: order.receiverEmail,
      receiverAddress: order.receiverAddress,
      //define fo routes //
      cost: order.cost,
      size: order.size,
      orderValue: order.orderValue,
      tax: order.tax,
      total: order.total,
      weight: order.weight,
      insurance: order.insurance,
      note: order.note
      });
  }
}
