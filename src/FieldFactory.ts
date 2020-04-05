import { AbstractCollectionOptionsType, FieldOptionsType, FieldsetOptionsType, GetFieldOptionsType } from './Types';
import { FormCollection } from './FormCollection';
import { FormFieldset } from './FormFieldset';
import { FormField } from './FormField';
import { FormFieldGenericType, ScalarFieldValueType } from './Types/';

export class FieldFactory {

  public createField<T, TMeta = unknown>(options: GetFieldOptionsType<T, TMeta>): FormFieldGenericType<T, TMeta> {
    const properties = Object.getOwnPropertyNames(options);

    if (properties.includes('items')) {
      return (new FormCollection(options as AbstractCollectionOptionsType<T>) as FormFieldGenericType<T, TMeta>);
    } else if (properties.includes('fields')) {
      return (new FormFieldset(options as FieldsetOptionsType<T, TMeta>) as FormFieldGenericType<T, TMeta>);
    } else if (properties.includes('value')) {
      return (new FormField(options as FieldOptionsType<ScalarFieldValueType>) as FormFieldGenericType<T, TMeta>);
    } else {
      throw new Error('Field type is undefined');
    }
  }

}
