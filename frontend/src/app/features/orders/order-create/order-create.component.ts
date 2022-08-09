import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { C, COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { Observable } from "rxjs";
//import { Store, select } from "@ngrx/store";

import { Order } from 'src/app/models/order';
import { OrderRoute } from "src/app/models/order-route";
import { OrderService } from "src/app/services/order.service";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { NotificationService } from "src/app/core/services/notification.service";
//import { GlobalState } from "src/app/store/states/global.state";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  @ViewChild('filePicker') fileUploader!: ElementRef;

  colors: Array<ThemePalette> = [undefined, 'primary', 'warn'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orderRoutes: OrderRoute[] = [];
  form!: FormGroup;
  private mode: string = 'create';
  private orderId!: string;
  order!: Order;
  //imagePreviews: Array<string> = [];
  imagePreview: string = '';
  requiredImgType: Array<string> = ['.jpg', '.png', '.jpeg'];

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
    private route: Router,
    private orderService: OrderService,
    private notificationService: NotificationService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.ar.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.titleServic.setTitle('Delivery Management System - Edit Order');
        this.mode = 'edit';
        this.orderId = <string>paramMap.get('id');

        this.orderService.getOrder(this.orderId).subscribe(response => {
          this.order = response;
          this.setFormValue(this.order);
        }, error => {
          console.log(error.error.error);
          this.notificationService.openSnackBar(error.error.error);
        });
      } else {
        this.titleServic.setTitle('Delivery Management System - Create Order');
        this.mode = 'create';
        this.orderId = '';
      }
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.pattern('^[0-9]{10}$')],
      senderEmail: ['', Validators.email],
      senderAddress: ['', Validators.required],
      receiverName: ['', Validators.required],
      receiverPhone: ['', Validators.pattern('^[0-9]{10}$')],
      receiverEmail: ['', Validators.email],
      receiverAddress: ['', Validators.required],
      //define fo routes //
      cost: ['', Validators.required],
      size: ['', Validators.required],
      orderValue: ['', Validators.required],
      tax: [0, Validators.required],
      total: ['', Validators.required],
      weight: ['', Validators.required],
      insurance: [false],
      orderDate: [Date.now()],
      images: [''],
      imageName: [''],
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
      orderDate: order.orderDate,
      note: order.note
      });
  }

  public onSaveOrder() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.orderService.addOrder({ ...this.form.value })
        .subscribe(response => {
          console.log(response);
          this.order = response;
          this.route.navigate(['orders']);
        }, error => {
          this.notificationService.openSnackBar(error.error.error);
        });
    } else {
      this.orderService.updateOrderById(this.orderId, { ...this.order, ...this.form.value })
        .subscribe(response => {
          this.order = response;
          this.route.navigate(['orders']);
        }, error => {
          this.notificationService.openSnackBar(error.error.error);
      })
    }
  }

  public onImagePicker(event: Event) {
    const element = (event.target as HTMLInputElement);
    const files = element.files ? element.files[0] : null;

    this.form.get('images')?.patchValue(files);
    this.form.get('images')?.updateValueAndValidity();
    this.form.get('imageName')?.patchValue(files?.name)

    const reader = new FileReader();
    reader.onload = () => {
      //this.imagePreviews.push(reader.result as string);
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(files as File);
  }

  public onDeleteImage() {
    this.fileUploader.nativeElement.value = null;
    this.imagePreview = '';
    this.form.get('images')?.patchValue('');
    this.form.get('imageName')?.patchValue('');
  }

  public onCancel() {
    this.form.reset();
    this.route.navigate(['orders']);
  }
}
