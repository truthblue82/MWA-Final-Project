import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { Order } from 'src/app/models/order';
import { OrderRoute } from "src/app/models/order-route";
import { OrderService } from "src/app/services/order.service";
import { GlobalState } from "src/app/store/states/global.state";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  colors: Array<string> = ['', 'primary', 'warn'];
  orderRoutes: OrderRoute[] = [];
  form!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  //need to change
  panelOpenState: boolean = false;
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  constructor(
    private titleServic: Title,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.titleServic.setTitle('Delivery Management System - Create Order');
  }
}
