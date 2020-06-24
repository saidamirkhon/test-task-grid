import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';
import {
  fromEvent,
  Subject
} from 'rxjs';
import {
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-resize-width',
  templateUrl: './resize-width.component.html',
  styleUrls: ['./resize-width.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizeWidthComponent implements AfterViewInit, OnDestroy {
  @Output() positionChange: EventEmitter<number> = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject();
  private position = 0;

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    if (element) {
      const dragStart$ = fromEvent(element, 'mousedown');
      const drag$ = fromEvent(document, 'mousemove');
      const dragEnd$ = fromEvent(document, 'mouseup');
      dragStart$.pipe(
        tap(_ => this.position = 0),
        switchMap(_ => drag$
          .pipe(
            tap((dragEvent: MouseEvent) => {
              dragEvent.preventDefault();
              const currentX = dragEvent.clientX;
              if (this.position === 0) {
                this.position = currentX;
              } else {
                const diff = currentX - this.position;
                this.positionChange.emit(diff);
                this.position = currentX;
              }
            }),
            takeUntil(dragEnd$)
          )),
        takeUntil(this.destroy$.asObservable())
      )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  constructor(private elementRef: ElementRef) {

  }
}
