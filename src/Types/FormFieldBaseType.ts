import { ValidationErrorsType } from './ValidationErrorsType';

export type FormFieldBaseType<T, TMeta = unknown> = {

  value: T;

  isDirty: boolean;

  meta: TMeta;

  error: ValidationErrorsType<T>;

  setError(error: ValidationErrorsType<T>); void;

  setMeta(meta: TMeta): void;

}
