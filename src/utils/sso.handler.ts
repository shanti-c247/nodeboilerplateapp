import env from '@config/envVar';
import { logger } from '@config/logger';
import { ssoMessages } from '@constants';
import type { IUser } from '@customTypes';
//Enums
import { Strategy } from '@enums';
//Third-party modules
import { faker } from '@faker-js/faker';
import { User } from '@models';
//Third-party modules
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { type Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';

/** Google Strategy
 * This strategy is used to authenticate users using their Google account.
 * It requires a client ID, client secret, and callback URL.
 * The callback function receives the profile and calls `done` to pass the user to the next middleware.
 * If the user does not exist, a new user is created.
 * If the user exists but has a different email, the email is updated.
 * If an error occurs, it is passed to `done`.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken: string, _refreshToken: string, profile: Profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) throw new Error(ssoMessages.EMAIL_IS_REQUIRED);

        // Check for existing user
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email }],
        });
        logger.log(`GoogleStrategy profile check user: ${user}`);
        if (!user) {
          // Create a new user if none exists
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
          });
        } else if (user.email !== email) {
          // Update the user's email if it has changed
          user.email = email;
          await user.save();
        }
        logger.log(`GoogleStrategy profile user: ${user}`);
        // Successfully authenticated, pass the user to `done`
        done(null, user);
      } catch (error) {
        // Pass the error to `done`
        done(error);
      }
    },
  ),
);
/** Facebook Strategy
 * This strategy is used to authenticate users using their Facebook account.
 * It requires a client ID, client secret, and callback URL.
 * The callback function receives the profile and calls `done` to pass the user to the next middleware.
 * If the user does not exist, a new user is created.
 * If the user exists but has a different email, the email is updated.
 * If an error occurs, it is passed to `done`.
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: env.FACEBOOK_CLIENT_ID || '',
      clientSecret: env.FACEBOOK_CLIENT_SECRET || '',
      callbackURL: env.FACEBOOK_CALLBACK_URL,
      profileFields: ['_id', 'emails', 'name'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails ? profile.emails[0].value : '';
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            email,
            name: `${profile.name?.givenName} ${profile.name?.familyName}`,
          });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

/** Serialize and Deserialize User
 * The user ID is serialized to the session and deserialized when subsequent requests are made.
 * This allows the user to be retrieved from the database and used in the request.
 */
passport.serializeUser((user, done) => {
  const userId = (user as IUser).id;
  logger.log(`Serialized user ID: ${userId}`);
  done(null, userId);
});

/** Deserialize User
 * The user ID is deserialized from the session and used to retrieve the user from the database.
 * This allows the user to be retrieved from the database and used in the request.
 */
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error(ssoMessages.USER_FOUND_DURING_DESERIALIZE);
    done(null, user);
  } catch (error) {
    logger.error(`Deserialization error: ${error}`);
    done(error);
  }
});

/**
 * Generates random data for a SSO schema based on the provided type.
 * @param {string} type - The type of SSO schema to generate data for.
 * @returns {Record<string, unknown>} - The random data for the SSO schema.
 * @throws {Error} If the type is not supported.
 */
export const ssoRandomData = (type: string) => {
  switch (type) {
    case 'ssoSchema':
      return {
        id: { type: 'string', example: faker.string.uuid() },
        name: { type: 'string', example: faker.person.fullName() },
        email: { type: 'string', example: faker.internet.email() },
        createdAt: { type: 'string', example: faker.date.past() },
        updatedAt: { type: 'string', example: faker.date.recent() },
      };

    case 'ssoLoginRequest':
      return {
        strategy: {
          type: 'string',
          enum: [Strategy.Google, Strategy.Facebook],
          example: Strategy.Google,
        },
      };
    case 'ssoUserResponse':
      return {
        token: { type: 'string', example: faker.string.uuid() },
        message: { type: 'string', example: ssoMessages.SSO_LOGIN_SUCCESS },
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};
