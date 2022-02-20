import { timer } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

export class ToastModel {
  public isActive = true;

  constructor(
    public variant: 'success' | 'error' | 'warning' | 'info',
    public message: string,
    public duration: number
  ) {
    this.variant = variant;
    this.message = message;
    this.duration = duration;
  }
}
