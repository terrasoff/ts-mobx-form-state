# Description 

Form state manager written with mobx :muscle: and typescript :heart: which helps you to handle forms workflow.

* Represents form state as a separate standalone store. Controlling the instance of the store you can manage your form from any point of your code.
 
* Easy to test :wrench: as soon as it is a separate store. 

* Gives you a clear way :rocket: how to build and control forms with any complexity :nerd_face:

* Provides strict typescript checks for all fields including deep nested fields.

* Provides clear and flexible client-side form validation flow. 
You don't need to use html attribute validation anymore. You are free to use any standalone validation library and test it separately. 
For the instance, consider [this one](https://github.com/AlexJPotter/fluentvalidation-ts) :sunglasses:

* Define a server-side validation error response with typescript. It forces you to unify all your API responses.  

* Allows you to add extra information to input fields (like hint or warning) and unify it within your forms.

* Control the form's state. Like initial state or check if it's dirty.  

# Example 

Check out the basic example [here](https://codesandbox.io/s/typescript-mobx-form-state-library-usage-example-hsdmh).

It uses [fluent validation](https://github.com/AlexJPotter/fluentvalidation-ts)
and gives you some the best practices to build forms.
 

# How to use

In the example :point_up: we have code ideas how to build forms with the library. 
Let's review that example simplified it a bit. 

## Create form model 

```ts
import { PersonAddress } from './PersonAddress';
import { PersonPhone } from './PersonPhone';

export type Person = {

  name: string;

  address: PersonAddress;

  phones: Array<PersonPhone>;

};
```

The form in the example relies on this model to check types:

```ts
this.form = new Form<Person, Meta>(...);
```

And for the validation errors:

```ts
// Create validator based on Person model:
// this._validationService.validate(model) method will return ValidationErrors<Person>.
private _validator = this._validationService.create<Person>(...);
```

You can see the example in `BasicFormStore.ts` file :point_down:

## Create form store

Form store is `BasicFormStore.ts`. It links form store and validator.
It contains another helper methods like `submit()`.

:star: Good to use along with [AsyncOperationStore](https://www.npmjs.com/package/ts-mobx-basic-stores#asyncoperation) to handle submit operations.

- Property `form` represents the form store instance

- Property `_validator` represents the instance of `BasicFormValidator` validator.

```ts
import { Person } from './Models';
import { computed, reaction } from 'mobx';
import { BasicFormValidator } from './Validators/BasicFormValidator';
import { Form } from 'ts-mobx-form-state';
import { DisposerStore } from 'ts-mobx-basic-stores';
import { ValidationService } from '../../Services/Validation';

type Meta = {
  warning: string;
}

export class BasicFormStore {

  public readonly form: Form<Person>;

  // Inject your validation service here
  private _validationService = new ValidationService();

  // Create your validator
  private _validator = this._validationService.create<Person>(new BasicFormValidator());

  private readonly _disposer = new DisposerStore();

  constructor() {
    this.submit = this.submit.bind(this);
    
    // @ts-ignore
    this.form = new Form<Person, Meta>(
      {
        fields: {
          name: {
            value: 'Bob Martin',
            meta: {
              warning: 'This is not your real name.',
            }
          },
        }
      }
    );

    // Set up reaction to validate form on any model's change.
    this._disposer.push(
      reaction(
        (): Person => this.form.value,
        (): void => {
          this.form.setError(
            this._validator.validate(this.form.value)
          );
        },
      )
    );
  }

  @computed
  public get model(): Person {
    return this.form.value;
  }

  public dispose(): void {
    this._disposer.dispose();
  }

  public submit(): void {
    console.log('form value', this.form.value);
  }
}

```

## Set up validator

Set up validation reaction is simple. You can use mobx reaction for it:
```ts
import { Person } from '../Models';
import { Validator } from 'fluentvalidation-ts';
import { PersonPhoneValidator } from './PersonPhoneValidator';
import { PersonAddressValidator } from './PersonAddressValidator';

export class BasicFormValidator extends Validator<Person> {

  constructor() {
    super();

    this
      .ruleFor('name')
      .notEmpty()
      .withMessage('Fill up the field')
      .minLength(3)
    ;
  }

}

```

Once form value is changed validator will be applied to the form.

## Add fields components

**Form components** is the third core idea.
Form component is aware of specific form field store and know how to react on it.

In the giving example you can find `TextField` form component.
It represents the basic text form field.

The form component should define 
- How to render the error message from field store.
- How to render the form field's value.
- Process the change value event.

Let's see a simple example:

```tsx
import React, { PureComponent, ReactNode } from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { observer } from 'mobx-react';
import Feedback from 'react-bootstrap/Feedback';
import classNames from 'classnames';
import { FormField } from 'ts-mobx-form-state';

type FormFieldProps = {

  label?: string;

  field: FormField;

}

@observer
export class TextField extends PureComponent<FormFieldProps> {

  public render(): ReactNode {
    const {
      field,
      label,
    } = this.props;

    // Define the state of invalid input
    const invalid = field.isTouched && field.hasError;

    return (
      <FormGroup style={{ marginBottom: 0 }}>
        {
          // Render label here if prensented
          // Label is optional and may be ommited
          label
          && (
            <FormLabel style={{ fontSize: 'small', marginBottom: 0 }}>
              {
                label
              }
            </FormLabel>
          )
        }
        <FormControl<'input'>
          size='sm'
          type='text'
          // React to the change event here and mutate the field store's value
          onChange={(e): void => field.set(e.currentTarget.value || "")}
          value={String(field.value)}
          className={
            classNames(
              {
                // Add invalid class to render the bootstrap feedback error.
                'is-invalid': invalid
              }
            )
          }
        />
        <Feedback
          // Add invalid or valid type to render the bootstrap feedback.
          type={invalid ? 'invalid' : 'valid'}
        >
          {
            // Show the field store's error here
            field.error
          }
        </Feedback>
      </FormGroup>
    );
  }

}
```

The form consists of that fields

```tsx
import React, { PureComponent, ReactNode } from 'react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { BasicFormStore } from './BasicFormStore';
import { TextField } from '../../FieldTypes';

type BasicFormProps = {

  store: BasicFormStore;

}

export class BasicForm extends PureComponent<BasicFormProps> {

  public componentWillUnmount(): void {
    // dispose reactions on unmount
    this.props.store.dispose();
  }

  public render(): ReactNode {
    const {
      form: {
        fields,
      },
      submit,
    } = this.props.store;

    return (
      <Form
        title='Basic form'
      >
        <TextField
          label='Name'
          field={fields.name}
        />
        <Button
          size="sm"
          type='button'
          variant='primary'
          // Use form value to submit the form
          onClick={submit}
        >
          Submit
        </Button>
      </Form>
    );
  }

}
```
To submit the form just use `store.submit()` method.

# Installation

`npm i ts-mobx-form-state`

# Code styles

Run `npm run lint`.

# Tests

Run `npm run test`.

# Roadmap

- Get the stable release 1.0.0 ready.

- Enhance typescript checking to get strict mode checking. 