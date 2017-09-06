import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

import User from '../models/user';
import configKeys from '../config/keys';
import UserRepo from '../models/user';

//local login strat
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

//google oauth strat
const googleOAuthOptions = {
    clientID: configKeys.googleClientID,
    clientSecret: configKeys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
};
const googleOAuthLogin = new GoogleStrategy(googleOAuthOptions, async (accessToken, refreshToken, profile, done) => {
    console.log('hi there');
    let user = await UserRepo.findOne({ googleId: profile.id });

    if (!user) {
        user = await UserRepo.create({ googleId: profile.id });
    }

    done(null, user);
});

//from jwt strat
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: configKeys.jwtEncryptionKey
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
});

passport.use(localLogin);
passport.use(googleOAuthLogin);
passport.use(jwtLogin);