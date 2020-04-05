import { computed } from 'mobx';
import { FormFieldset } from './FormFieldset';
import {
  FieldsetValidationType,
  FormFieldMetaType,
  FormFieldsetType,
  FormOptionsType,
  ValidationErrorsType
} from './Types';

export class Form<T, TMeta = unknown> {

  private readonly _fields: FormFieldset<T, TMeta>;

  @computed
  public get value(): T {
    return this._fields.value;
  }

  @computed
  public get isDirty(): boolean {
    return this._fields.isDirty;
  }

  public get hasError(): boolean {
    return this._fields.hasError;
  }

  @computed
  public get state(): Object {
    return {
      hasErrors: this.hasError,
      isDirty: this.isDirty,
      meta: this.meta,
    };
  }

  @computed
  public get error(): FieldsetValidationType<T> {
    return this._fields.error;
  }

  @computed
  public get meta(): FormFieldMetaType<T, TMeta> {
    return this._fields.meta;
  }

  public get fields(): FormFieldsetType<T, TMeta> {
    return this._fields.all;
  }

  public setMeta(meta: FormFieldMetaType<T, TMeta>): void {
    this._fields.setMeta(meta);
  }

  constructor(options: FormOptionsType<T, TMeta>) {
    this._fields = new FormFieldset<T, TMeta>(options);
  }

  public setError(error: ValidationErrorsType<T>): void {
    this._fields.setError(error);
  }

  public resetError(): void {
    this._fields.resetError();
  }

}
