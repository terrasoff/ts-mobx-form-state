import { GetCollectionItemType } from './GetCollectionItemType';
import { ScalarFieldValueType } from './ScalarFieldValueType';

export type FormFieldMetaType<T, M> =
  T extends ScalarFieldValueType
    ? M :
    T extends Array<unknown>
      ? Array<FormFieldMetaType<GetCollectionItemType<T>, M>> :
      T extends Object
        ? { [K in keyof T]?: FormFieldMetaType<T[K], M> } :
        never
  ;
