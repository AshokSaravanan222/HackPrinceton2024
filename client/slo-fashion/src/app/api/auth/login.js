// pages/api/auth/login.js
import { getLoginState, handleLogin } from '@auth0/nextjs-auth0';

export default async function login(req, res) {
  try {
    await handleLogin(req, res, {
      // Customizing the returnTo parameter
      returnTo: '/wardrobe',
      // Optionally customize the login state
      getLoginState(req, options) {
        return {
          ...getLoginState(req, options),
          returnTo: '/wardrobe',
        };
      },
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}