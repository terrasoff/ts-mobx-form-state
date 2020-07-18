# Description 

Form state manager written with mobx :muscle: and typescript :hearts: which helps you to handle forms workflow.

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
 

# Installation

`npm i ts-mobx-form-state`

# Code styles

Run `npm run lint`.

# Tests

Run `npm run test`.

# Roadmap

- Get the stable release 1.0.0 ready.

- Enhance typescript checking to get strict mode checking. 