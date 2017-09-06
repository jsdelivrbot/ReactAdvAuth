import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
    googleId: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//on save hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
}

const UserModel = mongoose.model('user', userSchema);
export default UserModel;