import { FieldStore } from './FieldStore';
import { computed } from 'mobx';
import { FieldOptionsType, ScalarFieldValueType, ValidationErrorsType } from './Types';
import { ValueStore } from 'ts-mobx-basic-stores';

export class FormField<TMeta = unknown> {

  private readonly _value: FieldStore<ScalarFieldValueType>;

  private readonly _error = new ValueStore<string>();

  private readonly _meta = new ValueStore<TMeta>();

  @computed
  public get value(): ScalarFieldValueType {
    return this._value.value;
  }

  @computed
  public get isDirty(): boolean {
    return this._value.hasChanged;
  }

  @computed
  public get isTouched(): boolean {
    return this._value.isTouched;
  }

  @computed
  public get error(): ValidationErrorsType<ScalarFieldValueType> {
    return this._error.value;
  }

  @computed
  public get meta(): TMeta {
    return this._meta.value;
  }

  @computed
  public get hasError(): boolean {
    return !this._error.isDefault;
  }

  public get field(): FieldStore<ScalarFieldValueType> {
    return this._value;
  }

  constructor(options: FieldOptionsType<ScalarFieldValueType, TMeta>) {
    this._value = new FieldStore<ScalarFieldValueType>({
      defaultValue: options.value,
    });

    if (options.meta) {
      this.setMeta(options.meta);
    }
  }

  public set(value: ScalarFieldValueType): void {
    this._value.set(value);
  }

  public setError(error: ValidationErrorsType<ScalarFieldValueType>): void {
    this._error.set(error);
  }

  public setMeta(meta: TMeta): void {
    this._meta.set(meta);
  }

  public resetError(): void {
    this._error.reset();
  }

}
