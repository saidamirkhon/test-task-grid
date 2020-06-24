import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  fromEvent,
  Subject,
  Subscription
} from 'rxjs';
import { ICellValueChangeCallback } from '../../models/cell-value-change-callback';
import {
  filter,
  takeUntil,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() key: string;
  @Input() value: string;
  @Input() editable: boolean;
  @ViewChild('editElement') editElement: ElementRef;
  valueChangeCallback: ICellValueChangeCallback;
  isEditMode = false;
  private initialValue: string;
  private destroy$: Subject<boolean> = new Subject();
  private blurHandlerSub: Subscription;

  onValueChange(): void {
    this.isEditMode = false;
    const value = this.editElement.nativeElement.value;
    if (value !== this.initialValue) {
      this.valueChangeCallback({key: this.key, value: value});
      this.initialValue = value;
    }
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.initialValue = this.value;
  }

  ngAfterViewInit(): void {
    this.attachDblClickListener();
    this.attachKeyUpHandler();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private cancelEdit(): void {
    this.value = this.initialValue;
    this.blurHandlerSub.unsubscribe();
    this.isEditMode = false;
    this.cdr.detectChanges();
  }

  private attachDblClickListener() {
    const element = this.elementRef.nativeElement;
    if (element) {
      fromEvent(element, 'dblclick')
        .pipe(
          filter(() => !this.isEditMode),
          tap((event: Event) => {
            event.stopPropagation();
            this.isEditMode = true;
            this.cdr.detectChanges();
            this.attachBlurHandler();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  private attachKeyUpHandler(): void {
    const element = this.elementRef.nativeElement;
    if (element) {
      fromEvent(element, 'keyup')
        .pipe(
          filter((event: KeyboardEvent) => event.key === 'Escape'),
          tap(_ => this.cancelEdit()),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  private attachBlurHandler(): void {
    const element = this.editElement.nativeElement;
    if (element) {
      if (this.blurHandlerSub) {
        this.blurHandlerSub.unsubscribe();
      }
      this.blurHandlerSub = fromEvent(element, 'blur')
        .pipe(
          tap(_ => this.onValueChange()),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  constructor(
    public cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
  }

}
