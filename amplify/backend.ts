import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
// import { storageHandler } from './functions/s3-trigger/resource';


defineBackend({
  auth,
  data,
  storage,
  // storageHandler,
});
