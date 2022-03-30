import {
  BehaviorSubject,
  catchError,
  from,
  mergeMap,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';

export type TaskItemStatus = 'pending' | 'started' | 'completed' | 'failed';

export class TaskItem {
  public status = new BehaviorSubject<TaskItemStatus>('pending');

  constructor(public task: () => Promise<any>) {}

  public runTask(): Observable<any> {
    this.status.next('started');
    return from(this.task()).pipe(
      catchError((error) => {
        this.status.next('failed');
        return of(error);
      }),
      tap(() => this.status.next('completed'))
    );
  }
}

export class TaskQueue {
  private queue: Subject<TaskItem> = new Subject();

  private MAX_CONCURRENT_TASKS = 1;

  constructor() {
    this.queue
      .pipe(
        mergeMap((item) => {
          return item.runTask();
        }, this.MAX_CONCURRENT_TASKS)
      )
      .subscribe();
  }

  public addTask(item: TaskItem) {
    this.queue.next(item);
  }
}
export default new TaskQueue();
