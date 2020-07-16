import { action, computed, observable, toJS } from 'mobx';
import { FieldStoreOptions } from './Types';

export class FieldStore<T> {

  private _defaultValue: T;

  @observable
  private _value: T;

  @observable
  private _touched: boolean = false;

  @computed
  public get value(): T {
    return this._value;
  }

  @computed
  public get hasChanged(): boolean {
    return this._value !== this._defaultValue;
  }

  @computed
  public get isTouched(): boolean {
    return this._touched;
  }

  @computed
  public get isDefault(): boolean {
    return this._value === this._defaultValue;
  }

  constructor(options: FieldStoreOptions<T> = {}) {
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);

    this._defaultValue = options.defaultValue || undefined;

    if (options) {
      if (Object.prototype.hasOwnProperty.call(options, 'value')) {
        this._value = options.value;
      } else if (Object.prototype.hasOwnProperty.call(options, 'defaultValue')) {
        this._value = options.defaultValue;
      }
    }
  }

  @action
  public set(value: T): void {
    this._touched = true;
    this._value = toJS(value);
  }

  @action
  public reset(): void {
    this.set(this._defaultValue);
  }

}
