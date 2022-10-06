/*
*
*   Users Routes
*   Users end points map to controllers and middleware assignment
*
 */

import { Router } from 'express';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestSchemaValidation from '../middlewares/request-schema-validation.js';
import newUserRequestSchema from '../requests-schema-body/new-user.requestschema.js';
import {
  // eslint-disable-next-line import/named
  getUser, createUser, updateUser, deleteUser,
} from '../controllers/users.controller.js';

const router = new Router();

router.get('/:userId', getUser);

router.post('/', contentTypeJson, requestSchemaValidation(newUserRequestSchema), createUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;
