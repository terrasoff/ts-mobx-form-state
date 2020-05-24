import { FormFieldset, ValidationErrorsType } from '@src';

type NameType = {
  first: string;
  last?: string;
};

function createFieldset(first: string, last?: string): FormFieldset<NameType> {
  return new FormFieldset<NameType>(
    {
      fields: {
        first: {
          value: first,
        },
        last: {
          value: last,
        }
      }
    }
  );
}

test('Get fieldset value', () => {
  const first = 'Mobx';
  const last = 'Form';
  const fieldset = createFieldset(first, last);

  expect(fieldset.value).toMatchObject({
    first,
    last,
  });
  expect(fieldset.value).toMatchObject({
    first,
    last,
  });
});

test('Change field value', () => {
  const first1 = 'Mobx1';
  const last1 = 'Form1';
  const first2 = 'Mobx2';
  const last2 = 'Form2';
  const fieldset = createFieldset(first1, last1);

  fieldset.fields.first.set(first2);
  fieldset.fields.last.set(last2);
  expect(fieldset.value).toMatchObject({
    first: first2,
    last: last2,
  });
});

test('Check dirty state', () => {
  const first1 = 'Mobx1';
  const last1 = 'Form1';
  const first2 = 'Mobx2';
  const last2 = 'Form2';
  const fieldset = createFieldset(first1, last1);

  expect(fieldset.isDirty).toBeFalsy();

  fieldset.fields.first.set(first2);
  expect(fieldset.isDirty).toBeTruthy();
  fieldset.fields.first.set(first1);
  expect(fieldset.isDirty).toBeFalsy();

  fieldset.fields.last.set(last2);
  expect(fieldset.isDirty).toBeTruthy();
  fieldset.fields.last.set(last1);
  expect(fieldset.isDirty).toBeFalsy();
});

test('Check touched state', () => {
  const first1 = 'Mobx1';
  const last1 = 'Form1';
  const first2 = 'Mobx2';
  const last2 = 'Form2';
  const fieldset = createFieldset(first1, last1);

  expect(fieldset.isTouched).toBeFalsy();

  fieldset.fields.first.set(first2);
  expect(fieldset.isTouched).toBeTruthy();
  fieldset.fields.first.set(first1);
  expect(fieldset.isTouched).toBeTruthy();

  fieldset.fields.last.set(last2);
  expect(fieldset.isTouched).toBeTruthy();
  fieldset.fields.last.set(last1);
  expect(fieldset.isTouched).toBeTruthy();
});

test('Check error state', () => {
  const first1 = 'Mobx1';
  const last1 = 'Form1';
  const fieldset = createFieldset(first1, last1);
  const error = 'Error';

  expect(fieldset.hasError).toBeFalsy();

  fieldset.fields.first.setError(error);
  expect(fieldset.hasError).toBeTruthy();
});

test('Check set error', () => {
  const first = 'Mobx';
  const last = 'Form';
  const fieldset = createFieldset(first, last);
  const error: ValidationErrorsType<NameType> = {
    first: 'First error',
    last: 'Last error',
  };

  fieldset.setError(error);
  expect(fieldset.hasError).toBeTruthy();
  expect(fieldset.error).toMatchObject(error);
});

test('Set empty error', () => {
  const first = 'Mobx';
  const last = 'Form';
  const fieldset = createFieldset(first, last);
  const error: ValidationErrorsType<NameType> = null;

  fieldset.setError(error);
  expect(fieldset.hasError).toBeFalsy();
});
