/*
*
*   Users Routes
*   Users end points map to controllers and middleware assignment
*
 */

import { Router } from 'express';
import contentTypeJson from '../middlewares/content-type-json.js';
import requestSchemaValidation from '../middlewares/request-schema-validation.js';
import { newUserRequestSchema, updateUserRequestSchema } from '../requests-schema-body/users.requestschema.js';
import {
  getUser, createUser, updateUser, deleteUser,
} from '../controllers/users.controller.js';

const router = new Router();

router.get('/:username', getUser);

router.post('/', contentTypeJson, requestSchemaValidation(newUserRequestSchema), createUser);

router.patch('/:username', requestSchemaValidation(updateUserRequestSchema), updateUser);

router.delete('/:username', deleteUser);

export default router;
