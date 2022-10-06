/*
*
*   Response-errors
*   Creates responses body for unsuccessful operations and errors that occur
*
*   - Definition for functions and objects that structure body responses for errors
*
 */

export function contentTypeNotJson(contentType) {
  return {
    error: 'content-type-not-json',
    description: 'The content type of the request is not of type JSON.',
    detail: {
      'Content-Type': contentType || '',
    },
  };
}

export function routeNotFound(route, method) {
  return {
    error: 'route-not-exit',
    description: 'The route you trying to access does not exist.',
    details: {
      route,
      method,
    },
  };
}

export const serverError = {
  error: 'server-internal-error',
  description: 'There has been an internal error',
  detail: {
    apologize: 'Sorry we are trying to solve this problem try later.',
  },
};

export function requestSchemaInvalid(field, error, value) {
  return {
    error: 'request-schema-body-invalid',
    description: 'The schema for the body request you provided is invalid',
    details: {
      field,
      error,
      value: value || '',
    },
  };
}
