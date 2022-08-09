import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ThemePalette } from "@angular/material/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { debounceTime, Observable, Subject, fromEvent } from "rxjs";
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
//import { Store, select } from "@ngrx/store";

import { Order } from 'src/app/models/order';
import { OrderRoute } from "src/app/models/order-route";
import { OrderService } from "src/app/services/order.service";
import { SpinnerService } from "src/app/core/services/spinner.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Warehouse } from "src/app/models/warehouse";
import { environment } from "src/environments/environment";
import { MatDialog } from "@angular/material/dialog";

//import { GlobalState } from "src/app/store/states/global.state";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('filePicker') fileUploader!: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  colors: Array<ThemePalette> = [undefined, 'primary', 'warn'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  odRoutes: OrderRoute[] = [];
  form!: FormGroup;
  mode: string = 'create';
  private orderId!: string;
  order!: Order;
  //imagePreviews: Array<string> = [];
  imagePreview: string = '';
  requiredImgType: Array<string> = ['.jpg', '.png', '.jpeg'];
  from!: Warehouse;
  to!: Warehouse;
  orderImages!: string;
  backendUrl: string = environment.backendUrl;

  constructor(
    private titleServic: Title,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private notificationService: NotificationService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.ar.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {

        if (this.router.url.includes('/edit/')) {
          this.mode = 'edit';
          this.titleServic.setTitle('Delivery Management System - Edit Order');

        } else {
          this.mode = 'view';
          this.titleServic.setTitle('Delivery Management System - Order Detail');
        }

        this.orderId = <string>paramMap.get('id');
        this.orderService.getOrder(this.orderId).subscribe(response => {

          this.order = response;
          this.setFormValue(this.order);
          this.odRoutes = this.order.routes;
          this.orderImages = response.images;
        }, error => {
          this.notificationService.openSnackBar(error.error.error);
        });
      } else {
        this.titleServic.setTitle('Delivery Management System - Create Order');
        this.mode = 'create';
        this.orderId = '';
      }
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        })
        , filter(res => res.length > 2)
        , debounceTime(1000)
        , distinctUntilChanged()
    ).subscribe((value: string) => {

      let query = `state=${value}`;
      if(!this.to) {
        query += `&first=1`;
      } else {
        query += `&whname=${this.to.name}`;
      }

      this.orderService.getNearestWareHouse(query) //lat,log get in service
        .subscribe(response => {
          this.searchInput.nativeElement.value = '';
          if (!response[1]) {
            this.notificationService.openSnackBar('Can not find the destination of route')
          } else {
            this.from = response[0];
            this.to = response[1];

            this.odRoutes.push({
              name: this.to.name,
              from: {
                name: this.from.name,
                address: JSON.stringify(this.from.address),
                contact: this.from.phone
              },
              to: {
                name: this.to.name,
                address: JSON.stringify(this.to.address),
                contact: this.to.phone,
              },
              color: ''
            });
          }

        }, error => {
          this.searchInput.nativeElement = '';
          this.notificationService.openSnackBar(error.error.error);
        })
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
      routes: [''],
      cost: ['', Validators.required],
      size: ['', Validators.required],
      orderValue: ['', Validators.required],
      tax: [0, Validators.required],
      total: ['', Validators.required],
      weight: ['', Validators.required],
      insurance: [false],
      orderDate: [Date.now()],
      imageFile: [''],
      images: [''],
      imageName: [''],
      note: ['']
    });
  }

  private setFormValue(order: Order) {
    this.odRoutes = order.routes;
    this.form.get('senderName')?.patchValue(order.senderName);
    this.form.get('senderPhone')?.patchValue(order.senderPhone);
    this.form.get('senderEmail')?.patchValue(order.senderEmail);
    this.form.get('senderAddress')?.patchValue(order.senderAddress);
    this.form.get('receiverName')?.patchValue(order.receiverName);
    this.form.get('receiverPhone')?.patchValue(order.receiverPhone);
    this.form.get('receiverEmail')?.patchValue(order.receiverEmail);
    this.form.get('receiverAddress')?.patchValue(order.receiverAddress);
    this.form.get('routes')?.patchValue(order.routes);
    this.form.get('cost')?.patchValue(order.cost);
    this.form.get('size')?.patchValue(order.size);
    this.form.get('orderValue')?.patchValue(order.orderValue);
    this.form.get('tax')?.patchValue(order.tax);
    this.form.get('total')?.patchValue(order.total);
    this.form.get('weight')?.patchValue(order.weight);
    this.form.get('insurance')?.patchValue(order.insurance);
    this.form.get('orderDate')?.patchValue(order.orderDate);
    this.form.get('images')?.patchValue(order.images);
    this.form.get('note')?.patchValue(order.note);
    this.form.get('routes')?.patchValue(this.odRoutes);
  }

  public onSaveOrder() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      if (this.odRoutes.length) {
        this.form.get('routes')?.patchValue(this.odRoutes);
      }
      this.orderService.addOrder({ ...this.form.value })
        .subscribe(response => {

          this.order = response;
          this.router.navigate(['orders']);
        }, error => {
          this.notificationService.openSnackBar(error.error.error);
        });
    } else {
      this.form.get('routes')?.patchValue(this.odRoutes);
      this.orderService.updateOrderById(this.orderId, { ...this.form.value })
        .subscribe(response => {
          console.log(response);
          this.order = response;

          this.router.navigate(['/orders']);
        }, error => {
          this.notificationService.openSnackBar(error.error.error);
      })
    }
  }

  public onImagePicker(event: Event) {
    const element = (event.target as HTMLInputElement);
    const files = element.files ? element.files[0] : null;

    this.form.get('imageFile')?.patchValue(files);
    this.form.get('imageFile')?.updateValueAndValidity();
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
    this.form.get('imageFile')?.patchValue('');
    this.form.get('imageName')?.patchValue('');
  }

  public onDeleteImage2() {
    this.fileUploader.nativeElement.value = null;
    this.orderImages = '';
    this.form.get('imageFile')?.patchValue('');
    this.form.get('imageName')?.patchValue('');
  }

  public onCancel() {
    this.form.reset();
    this.router.navigate(['orders']);
  }

  public removeRoute(index: number): void {
    this.odRoutes.splice(index, 1);
  }

  public searchWarehouse(event: Event) {
    //(keyup)="searchWarehouse($event)"
    const el = (event.target as HTMLInputElement);

    const searchText = el.value;
  }
}
