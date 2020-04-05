import { FormCollection } from '@src';

type CollectionType = string;

function createCollection(items: Array<CollectionType>): FormCollection<CollectionType> {
  return new FormCollection<CollectionType>(
    {
      items: items.map(x => ({ value: x }))
    }
  );
}

test('Get field value', () => {
  const list = [
    'Mobx',
    'Form',
    'State',
  ];
  const collection = createCollection(list);

  expect(collection.value).toMatchObject(list);
  expect(collection.value).toMatchObject(list);
});

test('Add new item', () => {
  const collection = createCollection([]);

  const name = 'Mobx';
  collection.add({ value: name });
  expect(collection.items.length).toEqual(1);
  expect(collection.value[0]).toEqual(name);
  expect(collection.value).toEqual([name]);
});

test('Change item', () => {
  const name1 = 'Bill';
  const name2 = 'Steve';
  const collection = createCollection([name1]);

  const field = collection.get(0);
  expect(field.value).toEqual(name1);
  field.set(name2);
  expect(field.value).toEqual(name2);
});

test('Check dirty state', () => {
  const name1 = 'Mobx';
  const name2 = 'Form';
  const collection = createCollection([name1]);

  const field = collection.get(0);
  field.set(name2);
  expect(collection.isDirty).toBeTruthy();
  field.set(name1);
  expect(collection.isDirty).toBeFalsy();
});

test('Check touched state by adding an item', () => {
  const name = 'Bill';
  const collection = createCollection([]);

  collection.add({ value: name });
  expect(collection.isTouched).toBeTruthy();
});

test('Check touched state by changing an item', () => {
  const name = 'Bill';
  const collection = createCollection([name]);

  const field = collection.get(0);
  field.set(name);
  expect(collection.isTouched).toBeTruthy();
});

test('Check error state', () => {
  const name1 = 'Mobx';
  const error = 'Error';
  const collection = createCollection([name1]);
  const field = collection.get(0);

  expect(field.hasError).toBeFalsy();
  field.setError(error);
  expect(collection.hasError).toBeTruthy();
  expect(field.hasError).toBeTruthy();
  expect(field.error).toBe(error);
  expect(collection.hasError).toBeTruthy();

  field.resetError();
  expect(field.hasError).toBeFalsy();
  expect(collection.hasError).toBeFalsy();
});
