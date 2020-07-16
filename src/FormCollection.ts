import { computed } from 'mobx';
import {
  CollectionOptionsType,
  CollectionValidationType,
  FormFieldType,
  GetFieldOptionsType,
  ValidationErrorsType
} from './Types';
import { FieldFactory } from './FieldFactory';
import { ArrayStore } from 'ts-mobx-basic-stores';

export class FormCollection<T, TMeta = unknown> {

  private readonly _items = new ArrayStore<FormFieldType<T, TMeta>>();

  private readonly _factory = new FieldFactory()

  constructor(options: CollectionOptionsType<T, TMeta> = { items: [] }) {
    this.add = this.add.bind(this);

    options.items.map(this.add);
  }

  public get list(): ArrayStore<FormFieldType<T, TMeta>> {
    return this._items;
  }

  @computed
  public get isDirty(): boolean {
    return this._items.items.some(x => x.isDirty);
  }

  @computed
  public get hasError(): boolean {
    return this._items.items.some(x => x.hasError);
  }

  @computed
  public get isTouched(): boolean {
    return (
      !this._items.isDefault
      || this._items.items.some(x => x.isTouched)
    );
  }

  public get items(): Array<FormFieldType<T, TMeta>> {
    return this._items.items;
  }

  public get(index: number): FormFieldType<T, TMeta> {
    return this._items.at(index);
  }

  public get value(): Array<T> {
    return this._items.items.map(x => x.value);
  }

  public get error(): ValidationErrorsType<Array<T>> {
    const error = this._items.items
      .map(
        x => (x as FormFieldType<T, TMeta>).error
      )
      .filter(x => x)
    ;

    if (error.length < 1) {
      return [];
    }

    return error as ValidationErrorsType<Array<T>>;
  }

  public get meta(): Array<TMeta> {
    const meta = this._items.items
      .map(
        x => (x as FormFieldType<T, TMeta>).meta
      )
      .filter(x => x)
    ;

    if (meta.length < 1) {
      return [];
    }

    return meta;
  }

  public add(item: GetFieldOptionsType<T, TMeta>): void {
    this._items.add(
      this._factory.createField(item) as FormFieldType<T, TMeta>
    );
  }

  public setError(error: CollectionValidationType<T>): void {
    this._items.items.forEach(
      (x, i) => x.setError(error[i])
    );
  }

  public setMeta(meta: Array<TMeta>): void {
    this._items.items.forEach(
      (x, i) => x.setMeta(meta[i])
    );
  }

  public resetError(): void {
    this._items.items.forEach(x => x.resetError());
  }

}
