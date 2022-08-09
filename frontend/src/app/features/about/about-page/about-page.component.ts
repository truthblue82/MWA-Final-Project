import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store } from "@ngrx/store";
import { GlobalState } from "src/app/store/states/global.state";
import { LoadOrder } from "src/app/store/actions/order.actions";
import { getCurrentOrder } from "src/app/store/selectors/order.selectors";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  form!: FormGroup;
  order$ = this.store.select(getCurrentOrder);
  //loading$ = this.store.select(selectUsersLoading);
  checked = true;

  constructor(private store: Store<GlobalState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      senderName: new FormControl(),
      senderPhone: new FormControl(),
      senderEmail: new FormControl(),
      senderAddress: new FormControl(),
      receiverName: new FormControl(),
      receiverPhone: new FormControl(),
      receiverEmail: new FormControl(),
      receiverAddress: new FormControl()
    });

    this.route.paramMap.subscribe((params: ParamMap) =>
      this.store.dispatch(LoadOrder({ _id: params.get("order_id")! }))
    );
  }
}
