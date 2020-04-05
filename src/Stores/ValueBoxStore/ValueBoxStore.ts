import { action, computed, observable } from 'mobx';
import { ValueBoxStoreOptions } from './ValueBoxStoreOptions';

/**
 * TODO move to separate repository
 */
export class ValueBoxStore<T> {

  private readonly _defaultValue: T;

  @observable
  private _value: T;

  constructor(options: ValueBoxStoreOptions<T> = null) {
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);

    this._defaultValue = options && options.defaultValue || undefined;

    if (options) {
      if (Object.prototype.hasOwnProperty.call(options, 'value')) {
        this.set(options.value);
      } else if (Object.prototype.hasOwnProperty.call(options, 'defaultValue')) {
        this.set(options.defaultValue);
      }
    }
  }

  @computed
  public get value(): T {
    return this._value;
  }

  @computed
  public get isDefault(): boolean {
    return this._value === this._defaultValue;
  }

  @computed
  public get isNotDefault(): boolean {
    return !this.isDefault;
  }

  @action
  public set(value: T): void {
    this._value = value;
  }

  @action
  public reset(): void {
    this.set(this._defaultValue);
  }

}
