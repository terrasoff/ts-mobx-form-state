import { FormField } from '../FormField';
import { FormCollection } from '../FormCollection';
import { FormFieldset } from '../FormFieldset';

export type ParentFormFieldType<T = unknown> =
  FormFieldset<T>
  | FormCollection<T>
  | FormField
  ;
