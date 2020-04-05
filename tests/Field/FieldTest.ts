import { FormField } from '@src';

type TestFormFieldType = string;

function createField(value: string): FormField<TestFormFieldType> {
  return new FormField(
    {
      value: value,
    }
  );
}

test('Get field value', () => {
  const name = 'Mobx';
  const field = createField(name);

  expect(field.value).toBe(name);
});

test('Change field value', () => {
  const name1 = 'Mobx';
  const name2 = 'Form';
  const field = createField(name1);

  field.set(name2);
  expect(field.isDirty).toBeTruthy();
});

test('Check dirty state', () => {
  const name1 = 'Mobx';
  const name2 = 'Form';
  const field = createField(name1);

  expect(field.isDirty).toBeFalsy();
  field.set(name2);
  expect(field.isDirty).toBeTruthy();
  field.set(name1);
  expect(field.isDirty).toBeFalsy();
});

test('Check touched state', () => {
  const name1 = 'Mobx';
  const name2 = 'Form';
  const field = createField(name1);

  expect(field.isTouched).toBeFalsy();
  field.set(name2);
  expect(field.isTouched).toBeTruthy();
  field.set(name1);
  expect(field.isTouched).toBeTruthy();
});

test('Check error state', () => {
  const name1 = 'Mobx';
  const field = createField(name1);
  const error = 'Error';

  expect(field.hasError).toBeFalsy();
  field.setError(error);
  expect(field.hasError).toBeTruthy();
  expect(field.error).toBe(error);
  field.resetError();
  expect(field.hasError).toBeFalsy();
});

test('Check set error', () => {
  const name1 = 'Mobx';
  const field = createField(name1);
  const error = 'Error';

  field.setError(error);
  expect(field.error).toBe(error);
});
