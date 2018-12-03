import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InterceptorService } from '../../../services/interceptor/interceptor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit, OnDestroy {

  @Input() form?: FormGroup;
  @Input() color?: string;
  @Input() size?: string;
  @Input() text: string;
  public submitted: boolean;
  public subscription: Subscription;

  constructor(private _interceptor: InterceptorService) { }

  ngOnInit() {
    this.color = this.color || 'primary';
    this.size = this.size || 'md';
    this.subscription = this._interceptor.requestCompleteSubject.subscribe(() => {
      this.submitted = false;
    });
  }

  showLoader() {
    setTimeout(() => this.submitted = true, 10);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
