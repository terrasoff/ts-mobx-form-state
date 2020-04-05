import { Form, ValidationErrorsType } from '@src';

type FormType = {
  age?: number;
  name?: {
    first?: string;
    last?: string;
  };
  phones?: [
    {
      number: string;
    }
  ];
}

function createForm(first: string, last?: string): Form<FormType> {
  return new Form<FormType>(
    {
      fields: {
        name: {
          fields: {
            first: {
              value: first,
            },
            last: {
              value: last,
            }
          }
        },
        phones: {
          items: []
        },
        age: {
          value: null,
        },
      },
    }
  );
}

test('Check set error', () => {
  const first = 'Bill';
  const last = 'Gates';
  const form = createForm(first, last);
  const error: ValidationErrorsType<FormType> = {
    name: {
      first: 'First error',
      last: 'Last error',
    },
  };

  expect(form.hasError).toBeFalsy();

  form.setError(error);
  expect(form.hasError).toBeTruthy();
  expect(form.error).toMatchObject(error);
  expect(form.fields.name.hasError).toBeTruthy();
  expect(form.fields.phones.hasError).toBeFalsy();
  expect(form.fields.age.hasError).toBeFalsy();

  form.resetError();
  expect(form.hasError).toBeFalsy();
  expect(form.fields.name.hasError).toBeFalsy();
  expect(form.fields.phones.hasError).toBeFalsy();
  expect(form.fields.age.hasError).toBeFalsy();
});
