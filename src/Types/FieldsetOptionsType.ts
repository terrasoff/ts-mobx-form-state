import { FieldOptionsType } from './FieldOptionsType';
import { AbstractCollectionOptionsType } from './AbstractCollectionOptionsType';
import { ScalarFieldValueType } from './ScalarFieldValueType';

export type GetFieldOptionsType<T extends Object, TMeta> =
  T extends ScalarFieldValueType
    ? FieldOptionsType<T, TMeta> :
    T extends Array<unknown>
      ? AbstractCollectionOptionsType<T, TMeta> :
      T extends Object
        ? FieldsetOptionsType<T, TMeta> :
        never
  ;

export type FieldsetFieldsOptionsType<T, TMeta = unknown> = {
  [K in keyof T] ?: GetFieldOptionsType<T[K], TMeta>
}

export type FieldsetOptionsType<T extends Object, TMeta = unknown> = {

  fields: FieldsetFieldsOptionsType<T, TMeta> | {};

}
