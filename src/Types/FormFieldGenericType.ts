import { FormCollection } from '../FormCollection';
import { FormField } from '../FormField';
import { FormFieldset } from '../FormFieldset';
import { GetCollectionItemType } from './GetCollectionItemType';
import { ScalarFieldValueType } from './ScalarFieldValueType';

type GetFormFieldByType<T, TMeta = unknown> =
  T extends ScalarFieldValueType
    ? FormField<TMeta> :
    T extends Array<GetCollectionItemType<T>>
      ? FormCollection<GetCollectionItemType<T>, TMeta> :
      T extends Object
        ? FormFieldset<T, TMeta> :
        never
  ;

export type FormFieldGenericType<T, TMeta = unknown> = GetFormFieldByType<T, TMeta>;
