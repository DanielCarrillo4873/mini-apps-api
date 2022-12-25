import {
  authenticate,
} from '../../src/models/accounts.model.js';

test('Authenticate user', async () => {
  const data = await authenticate('dexter4873', 'password');
  expect(data.username).toBe('dexter4873');
});