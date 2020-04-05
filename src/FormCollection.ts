import { computed } from 'mobx';
import {
  CollectionOptionsType,
  CollectionValidationType,
  FormFieldType,
  GetFieldOptionsType,
  ValidationErrorsType
} from './Types';
import { FieldFactory } from './FieldFactory';
import { FormCollectionStore } from './Stores';

export class FormCollection<T, TMeta = unknown> {

  private readonly _items = new FormCollectionStore<FormFieldType<T, TMeta>>();

  private readonly _factory = new FieldFactory()

  constructor(options: CollectionOptionsType<T>) {
    this.add = this.add.bind(this);

    (options.items || []).map(this.add);
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
    if (this._items.isNotDefault) {
      return true;
    }

    return this._items.items.some(x => x.isTouched);
  }

  public get items(): Array<FormFieldType<T, TMeta>> {
    return this._items.items;
  }

  public get(index: number): FormFieldType<T, TMeta> {
    return this._items.getByIndex(index);
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
      return undefined;
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
      return undefined;
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
