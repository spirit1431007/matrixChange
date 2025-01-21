type Listener<T> = (event: T, ...rest: any[]) => void;

export class Event {
  _events: Record<string, Function[]> = {};

  $on<T>(name: string, listener: Listener<T>): this {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(listener);
    return this;
  }

  $off<T>(name?: string, listener?: Listener<T>): this {
    if (!name || !listener) {
      this._events = {};
      return this;
    }

    const listeners = this._events[name];
    if (!listeners) {
      return this;
    }

    if (!listener) {
      this._events[name] = [];
      return this;
    }

    if (listener) {
      this._events[name] = this._events[name].filter((each) => each !== listener);
    }

    return this;
  }

  $emit<T>(name: string, event?: T, ...rest: any[]) {
    let listeners = this._events[name];
    if (listeners) {
      listeners.forEach((each) => each.call(this, event, ...rest));
    }

    return this;
  }
}
