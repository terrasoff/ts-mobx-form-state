import { GetFieldOptionsType } from './FieldsetOptionsType';

export type CollectionOptionsType<T, TMeta = unknown> = {

  items: Array<GetFieldOptionsType<T, TMeta>>;

}
