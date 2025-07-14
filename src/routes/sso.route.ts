import express from 'express';
import passport from 'passport';

import { ssoController } from '@controllers';
import { Strategy } from '@enums';
import { passportAuthenticate } from '@middlewares';
import '../utils/sso.handler';

const app = express();
// Initialize passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();

router.post('/login', passportAuthenticate);

router.get(
  '/google/callback',
  passport.authenticate(Strategy.Google, {
    failureRedirect: '/login',
  }),
  ssoController.ssoLogin,
);

router.get(
  '/facebook/callback',
  passport.authenticate(Strategy.Facebook, {
    failureRedirect: '/login',
  }),
  ssoController.ssoLogin,
);

export default router;
