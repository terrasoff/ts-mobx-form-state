import { FormFieldType } from './FormFieldType';

export type FormFieldsetType<T, TMeta = unknown> = {
  [K in keyof T]: FormFieldType<T[K], TMeta>
}
