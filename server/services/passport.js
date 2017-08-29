import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

import User from '../models/user';
import config from '../config';

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

//from jwt strat
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
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
passport.use(jwtLogin);