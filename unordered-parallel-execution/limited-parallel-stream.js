import { Transform } from "stream";

export class LimitedParallelStream extends Transform {
  constructor(processFn, concurrencyLevel = 4, options) {
    super({ objectMode: true, ...options });

    this.processFn = processFn;

    this.concurrencyLevel = concurrencyLevel;

    this.tasksRunning = 0;

    this.processDone = null;

    this.terminateFn = null;
  }

  clearProcessDone() {
    const doneFn = this.processDone;

    this.processDone = null;

    if (doneFn) doneFn();
  }

  _transform(chunk, enc, done) {
    this.tasksRunning++;

    const push = this.push.bind(this);
    const onComplete = this._onComplete.bind(this);

    this.processFn(chunk, enc, push, onComplete);

    if (this.tasksRunning < this.concurrencyLevel) {
      done();
    } else {
      this.processDone = done;
    }
  }

  _flush(done) {
    if (this.tasksRunning > 0) {
      this.terminateFn = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.tasksRunning--;

    if (err) {
      return this.emit("error", err);
    }

    this.clearProcessDone();

    if (!this.tasksRunning && this.terminateFn) {
      this.terminateFn();
    }
  }
}
