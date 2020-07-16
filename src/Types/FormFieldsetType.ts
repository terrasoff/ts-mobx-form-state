import { FormFieldType } from './FormFieldType';

export type FormFieldsetType<T extends Object, TMeta = unknown> = {
  [K in keyof T]?: FormFieldType<T[K], TMeta>
};
