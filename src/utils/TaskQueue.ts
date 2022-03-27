import {
  catchError,
  flatMap,
  from,
  map,
  mergeMap,
  of,
  Subject,
  tap,
} from 'rxjs';

export type TaskItemStatus = 'started' | 'completed' | 'failed';

export class TaskItemEvent extends Event {}

export class TaskItem {
  public completed = new Subject<TaskItemEvent>();
  public started = new Subject<TaskItemEvent>();
  public failed = new Subject<TaskItemEvent>();

  constructor(public run: () => Promise<any>) {}

  public on(event: TaskItemStatus, callback: () => void): void {
    this[event].subscribe(callback);
  }
}

export class TaskQueue {
  private queue: Subject<TaskItem> = new Subject();

  private isRunning = false;

  private MAX_CONCURRENT_TASKS = 2;

  constructor() {
    this.queue
      .pipe(
        mergeMap((item) => {
          item.started.next(new TaskItemEvent(''));
          return from(item.run()).pipe(map(() => item));
        }, this.MAX_CONCURRENT_TASKS)
      )
      .subscribe({
        next: (item) => {
          item.completed.next(new TaskItemEvent(''));
        },
      });
  }

  public addTask(item: TaskItem) {
    this.queue.next(item);
    console.log('task added', this.queue);
  }
}
export default new TaskQueue();
