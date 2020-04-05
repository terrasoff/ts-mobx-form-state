import { FieldOptionsType } from './FieldOptionsType';
import { AbstractCollectionOptionsType } from './AbstractCollectionOptionsType';
import { ScalarFieldValueType } from './ScalarFieldValueType';

export type GetFieldOptionsType<T, TMeta> =
  T extends ScalarFieldValueType
    ? FieldOptionsType<T, TMeta> :
    T extends Array<unknown>
      ? AbstractCollectionOptionsType<T, TMeta> :
      T extends Object
        ? FieldsetOptionsType<T, TMeta> :
        never
  ;

type FieldsetFieldsOptionsType<T, TMeta = unknown> = {
  [K in keyof T] ?: GetFieldOptionsType<T[K], TMeta>
}

export type FieldsetOptionsType<T, TMeta = unknown> = {

  fields: FieldsetFieldsOptionsType<T, TMeta>;

}
