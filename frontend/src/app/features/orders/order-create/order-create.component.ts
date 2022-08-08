import { Component, OnInit } from "@angular/core";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  panelOpenState: boolean = false;
  form!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  constructor( ) { }

  ngOnInit(): void {
      //
  }
}
