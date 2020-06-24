import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  selector: 'app-header-cell',
  templateUrl: './header-cell.component.html',
  styleUrls: ['./header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderCellComponent {
  @Input() cellTitle: string;
  @HostBinding('style.width.px') cellWidth;
  private minWidth: number;

  onPositionChange(diffInPx: number): void {
    const currentWidth = this.elementRef.nativeElement.clientWidth;
    if (!this.minWidth) {
      this.minWidth = currentWidth;
    }
    const newWidth = currentWidth + diffInPx;
    if (newWidth > this.minWidth) {
      if (!this.cellWidth) {
        this.cellWidth = currentWidth + diffInPx;
      } else {
        this.cellWidth += diffInPx;
      }
    }
  }

  constructor(private elementRef: ElementRef) {
  }
}
