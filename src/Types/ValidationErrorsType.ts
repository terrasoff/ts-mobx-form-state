import { ScalarFieldValueType } from './ScalarFieldValueType';

export type ValidationErrorsType<T> =
  T extends ScalarFieldValueType
    ? string :
    T extends Array<unknown>
      ? CollectionValidationType<T> :
      T extends Object
        ? FieldsetValidationType<T> :
        never
  ;

export type CollectionValidationType<T> = Array<ValidationErrorsType<T>>;

export type FieldsetValidationType<T extends Object> = {
  [K in keyof T]?: ValidationErrorsType<T[K]>
}
