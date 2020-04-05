import { Form, FormFieldMetaType } from '@src';

type FormMetadataType = string;

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

function createForm(
  first: string,
  last: string,
  age: number,
  phone: string,
): Form<FormType, FormMetadataType> {
  return new Form<FormType, FormMetadataType>(
    {
      fields: {
        name: {
          fields: {
            first: {
              value: first,
              meta: first,
            },
            last: {
              value: last,
            }
          }
        },
        phones: {
          items: [
            {
              fields: {
                number: {
                  value: phone,
                  meta: phone,
                }
              }
            }
          ]
        },
        age: {
          value: age,
          meta: String(age),
        },
      },
    }
  );
}

test('Get default metadata', () => {
  const first = 'Form';
  const last = 'Master';
  const age = 123;
  const phone = '123';
  const form = createForm(first, last, age, phone);

  expect(form.meta).toMatchObject(
    {
      name: {
        first,
      },
      age: String(age),
      phones: [
        {
          number: phone,
        }
      ]
    }
  );
});

test('Change metadata', () => {
  const first1 = 'Form1';
  const last1 = 'Master1';
  const age1 = 123;
  const phone1 = '123';

  const first2 = 'Form2';
  const last2 = 'Master2';
  const age2 = 321;
  const phone2 = '321';

  const form = createForm(first1, last1, age1, phone1);

  const meta: FormFieldMetaType<FormType, FormMetadataType> = {
    age: String(age2),
    name: {
      first: first2,
      last: last2,
    },
    phones: [
      {
        number: phone2
      },
    ],
  };

  form.setMeta(meta);
  expect(form.meta).toMatchObject(meta);
});
