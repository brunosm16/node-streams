import { Transform } from "stream";

export class ParallelStream extends Transform {
  constructor(processFn, options) {
    super({ objectMode: true, ...options });

    this.tasksRunning = 0;

    this.processFn = processFn;

    this.terminateFn = null;
  }

  _transform(chunk, enc, done) {
    this.tasksRunning++;

    const push = this.push.bind(this);
    const onComplete = this._onComplete.bind(this);

    this.processFn(chunk, enc, push, onComplete);

    done();
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

    if (!this.tasksRunning && this.terminateFn) {
      this.terminateFn();
    }
  }
}
