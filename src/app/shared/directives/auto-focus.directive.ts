import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgModule
} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(private elementRef: ElementRef) {
  }
}

@NgModule({
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective]
})
export class AutoFocusDirectiveModule {
}
