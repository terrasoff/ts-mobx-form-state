Yet another form state manager library written with typescript and mobx which helps:

* Provides strict typescript checks for your form.
 
* Gives you a clear way to build your form controls and forms.

* Provide the flexible form validation flow (client or server side). You are free to use any side validator with that library.

* Allows you to add extra attributes to your input fields.

* Set form initial state with javascript model (object).

Pro:

* Strict types.

* Frameworks agnostic.

* Simple and clear validation flow.

Cons:

* Involves mobx state manager.

* Yes, you need a typescript.  

# Example 

Check out the basic example [here](https://codesandbox.io/s/vigilant-http-iv8vy).

It uses [fluent validation](https://github.com/AlexJPotter/fluentvalidation-ts)
and gives you some the best practises to build forms.
 

# Installation

`npm i --save ts-mobx-form-state`

# Code styles

Run `npm run lint`.

# Tests

Run `npm run test`.