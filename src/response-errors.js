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

export function endPointNotFound(route, method) {
  return {
    error: 'end-point-not-exist',
    description: 'The end point you trying to access does not exist.',
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
    apologize: 'Sorry we are trying to solve this problem, try later.',
  },
};

export function requestBodySchemaInvalid(field, error, value) {
  return {
    error: 'request-body-schema-invalid',
    description: 'The schema for the request you provided is invalid',
    details: {
      field,
      error,
      value: value || '',
    },
  };
}

export function resourceNotFound(resource, identifiedBy, value) {
  return {
    error: 'resource-not-found',
    description: 'The resource you are trying to find not exist',
    details: {
      resource,
      identifiedBy,
      value: value || '',
    },
  };
}

export const noAccessToken = {
  error: 'no-access-token',
  description: 'No access token was provided.',
  detail: {
    header: 'access-token header was not present in request headers.',
  },
};

export function accessTokenInvalid(accessToken) {
  return {
    error: 'invalid-access-token',
    description: 'The provided access token was invalid.',
    detail: {
      'access-token': accessToken,
    },
  };
}
