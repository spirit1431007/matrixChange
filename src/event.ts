type Listener<T> = (event: T, ...rest: any[]) => void;

export class Event {
  _events: Map<string, Set<Listener<any>>> = new Map();

  $on<T>(name: string, listener: Listener<T>): this {
    if (!this._events.has(name)) {
      this._events.set(name, new Set<Listener<any>>());
    }
    this._events.get(name)!.add(listener);
    return this;
  }

  $off<T>(name?: string, listener?: Listener<T>): this {
    if (!name || !listener) {
      this._events.clear();
      return this;
    }

    const listeners = this._events.get(name);
    if (!listeners) {
      return this;
    }

    if (!listener) {
      this._events.get(name)?.clear();
      return this;
    }

    if (listener) {
      this._events.get(name)?.delete(listener);
    }

    return this;
  }

  $emit<T>(name: string, event?: T, ...rest: any[]) {
    let listeners = this._events.get(name);
    if (listeners) {
      listeners.forEach((each) => each.call(this, event, ...rest));
    }

    return this;
  }
}
