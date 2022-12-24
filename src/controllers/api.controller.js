/**
*
*   API Controllers
*
*   - Entry point
*   - Sign up
*
* */

/**
 * API info object
 */
export function entryPointController(req, res) {
  res.json({
    title: 'Mini-Apps-API',
    description: 'Mini apps api, all resources, operations, authentication and authorization.',
    version: 1,
    ok: 1,
  });
}

/**
 * Redirects to accounts create end point
 */
export function signupController(req, res) {
  // noinspection JSDeprecatedSymbols
  res.redirect('accounts', 308);
}
