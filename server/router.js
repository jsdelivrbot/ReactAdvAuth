import passport from 'passport';

import * as Authentication from './controllers/authentication';
import './services/passport';

const requireAuthToken  = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default function (app) {
    app.get('/', requireAuthToken, (request, response) => {
        response.send({ message: 'super secret code is abc123' })
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}