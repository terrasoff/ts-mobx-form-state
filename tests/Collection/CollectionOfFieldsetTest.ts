import { FormCollection } from '@src';

type PhoneType = {

  type: string;

  number: string;

};

function createCollection(items: Array<PhoneType> = []): FormCollection<PhoneType> {
  return new FormCollection<PhoneType>();
}

test('Add object to collection.', () => {
  const collection = createCollection();
  collection.add({
    fields: {
      number: {
        value: 'number',
      },
      type: {
        value: 'type',
      },
    }
  });

  expect(collection.value.length).toEqual(1);
  expect(collection.get(0).value).toEqual({
    number: 'number',
    type: 'type',
  });
});
