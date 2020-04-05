import { FormFieldBaseType } from './FormFieldBaseType';
import { FormFieldGenericType } from './FormFieldGenericType';

export type FormFieldType<T, TMeta = unknown> = FormFieldBaseType<T, TMeta> & FormFieldGenericType<T, TMeta>;
