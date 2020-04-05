import { CollectionOptionsType } from './CollectionOptionsType';
import { GetCollectionItemType } from './GetCollectionItemType';

export type AbstractCollectionOptionsType<T, TMeta = unknown> = CollectionOptionsType<GetCollectionItemType<T>, TMeta>;
