import User from '../models/user';
import jwt from 'jwt-simple';

import config from '../config';

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export function signup(request, response, next) {
    const { email, password } = request.body;

    if (!email || !password) {
        response.status(422).send({ error: 'you must provide and email and a password' });
    }

    //check if user exists
    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        //if does, return error
        if (existingUser) {
            return response.status(422).send({ error: 'email is in use' });
        }

        //if not, create and save user record
        const user = new User({ email, password });

        user.save(err => {
            if (err) {
                return next(err);
            }

            //respond user was created
            response.json({ token: tokenForUser(user) });
        });

    });
}

export function signin(request, response, next) {
    response.json({ token: tokenForUser(request.user) });
}

