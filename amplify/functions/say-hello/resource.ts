// import { defineFunction } from '@aws-amplify/backend';

// export const sayHello = defineFunction({
//   // optionally specify a name for the Function (defaults to directory name)
//   name: 'say-hello',
//   // optionally specify a path to your handler (defaults to "./handler.ts")
//   entry: './handler.ts'
// });


import { defineFunction, defineStorage } from "@aws-amplify/backend";


export const lambda = defineStorage({
  name: 'myProjectFiles',
  triggers: {
    onUpload: defineFunction({
      entry: './on-upload-handler.ts'
    })
  }
});