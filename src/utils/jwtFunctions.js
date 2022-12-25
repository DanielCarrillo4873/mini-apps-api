/**
 *
 *    JWT Functions.
 *    Utils functions related to JWT
 *
 *    - Sign token function
 *    - Verify token function
 *
 */

import { sign, verify } from 'jsonwebtoken';
import {
  JWT_KEY, JWT_AL, JWT_EXP_TIME, JWT_ENABLE_EXP,
} from '../settings.js';

/**
 * Signs JWT
 * @param {Object} data - Data to be jwt payload
 * @returns {Promise<String>}
 */
export function signToken(data) {
  return new Promise((resolve, reject) => {
    sign(
      data,
      JWT_KEY,
      {
        expiresIn: JWT_EXP_TIME,
        algorithm: JWT_AL,
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      },
    );
  });
}

/**
 * Verify JWT authenticity
 * @param {String} token - String token to be decoded
 * @returns {Promise<Object>}
 */
export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    verify(
      token,
      JWT_KEY,
      {
        algorithm: JWT_AL,
        ignoreExpiration: !JWT_ENABLE_EXP,
      },
      (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      },
    );
  });
}
