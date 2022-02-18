import { timer } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

export class ToastModel {
  public isActive = true;

  private $close: Subject<void> = new Subject<void>();

  constructor(
    public variant: 'success' | 'error' | 'warning' | 'info',
    public message: string,
    public duration: number
  ) {
    this.variant = variant;
    this.message = message;
    this.duration = duration;
    this.startTimer();
    this.$close.subscribe(() => this.dismiss());
  }

  private startTimer() {
    timer(this.duration).subscribe(() => {
      this.$close.next();
    });
  }

  private dismiss() {
    this.isActive = false;
  }
}
