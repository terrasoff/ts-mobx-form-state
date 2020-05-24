import { computed } from 'mobx';
import {
  FieldsetOptionsType,
  FieldsetValidationType,
  FormFieldMetaType,
  FormFieldsetType,
  ValidationErrorsType
} from './Types';
import { FieldFactory } from './FieldFactory';

export class FormFieldset<T extends Object, TMeta = unknown> {

  private readonly _fields: FormFieldsetType<T, TMeta> = {} as FormFieldsetType<T, TMeta>;

  private readonly _factory = new FieldFactory()

  @computed
  public get meta(): FormFieldMetaType<T, TMeta> {
    return this.getNotEmptyTreeAttributeValue<FormFieldMetaType<T, TMeta>>('meta');
  }

  @computed
  public get value(): T {
    return this.getFullTreeAttributeValue('value');
  }

  @computed
  public get isDirty(): boolean {
    return this.checkNestedPropertyTruthy('isDirty');
  }

  @computed
  public get isTouched(): boolean {
    return this.checkNestedPropertyTruthy('isTouched');
  }

  @computed
  public get hasError(): boolean {
    return this.checkNestedPropertyTruthy('hasError');
  }

  @computed
  public get all(): FormFieldsetType<T, TMeta> {
    return this._fields;
  }

  @computed
  public get error(): FieldsetValidationType<T> {
    return this.getNotEmptyTreeAttributeValue<FieldsetValidationType<T>>('error');
  }

  constructor(options: FieldsetOptionsType<T, TMeta>) {
    Object.keys(options && options.fields || []).forEach(
      (key): void => {
        this._fields[key] = this._factory.createField<T, TMeta>(options.fields[key]);
      }
    );
  }

  public get fields(): FormFieldsetType<T, TMeta> {
    return this._fields;
  }

  private checkNestedPropertyTruthy(property: string): boolean {
    let result = false;
    Object.keys(this._fields).forEach(
      (key): void => {
        if (this._fields[key][property]) {
          result = true;
          return;
        }
      }
    );

    return result;
  }

  public setError(error: ValidationErrorsType<T>): void {
    this.resetError();
    if (error) {
      this.setAttributeValue('setError', error);
    }
  }

  public resetError(): void {
    Object.keys(this._fields).forEach(
      key => this._fields[key].resetError()
    );
  }

  public setMeta(meta: FormFieldMetaType<T, TMeta>): void {
    this.setAttributeValue('setMeta', meta);
  }

  private setAttributeValue<TValue>(
    setterName: string,
    value: TValue,
  ): void {
    // TODO enhance types
    if (typeof value === 'object') {
      Object.keys(value).forEach(
        key => {
          if (value[key]) {
            this._fields[key][setterName](value[key]);
          }
        }
      );
    }
  }

  private getNotEmptyTreeAttributeValue<TResult>(
    attributeName: string
  ): TResult {
    const fieldsetValue = {} as TResult;
    Object.keys(this._fields).forEach(
      key => {
        const value = this._fields[key][attributeName];
        if (
          value
          && typeof value === 'object'
          && Object.keys(value).length > 0
          || value
        ) {
          fieldsetValue[key] = value;
        }
      }
    );

    if (Object.keys(fieldsetValue).length < 1) {
      return undefined;
    }

    return fieldsetValue as TResult;
  }

  private getFullTreeAttributeValue<TValue>(
    attributeName: string,
  ): TValue {
    // TODO enhance types
    const attributes = {} as TValue;

    Object.keys(this._fields).forEach(
      (key): void => {
        attributes[key] = this._fields[key][attributeName];
      }
    );

    return attributes;
  }

}
