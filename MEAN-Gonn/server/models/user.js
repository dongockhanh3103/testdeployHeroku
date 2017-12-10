const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


/**Validate Email
 * Check lenght limit and valid email
 * 
 */
let emailLenghtChecker = (email) => {
    if (!email) {
        return false;
    }
    else {
        if (email.lenght < 5 || email.lenght > 30) {
            return false;
        }
        return true;
    }
}

let validEmail = (email) => {
    if (!email) {
        return false;
    }
    else {
        const regExp = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
        return regExp.test(email);
    }
};

const emailValidators = [{
    validator: emailLenghtChecker, message: 'E-mail must be at least 5 characters but no more than 30'
},
{
    validator: validEmail, message: 'Must be valid email'
}];

/** Validate firstname
 * check length and valid first name
 */

let firstnameLenghtChecker = (firstname) => {
    if (!firstname) {
        return false;
    }
    else {
        if (firstname.lenght > 35) {
            return false;
        }
        return true;
    }
};

let validFirstName = (firstname) => {
    if (!firstname) {
        return false;
    }
    else {
        return (/^[a-zA-Z ]+$/).test(firstname);
    }
}

const firstnameValidators = [{ validator: firstnameLenghtChecker, message: "First name no more than 30 characters" },
{ validator: validFirstName, message: "First name must not have number or special character" }];

/** validate last name
 * 
 */

let lastnameLenghtChecker = (lastname) => {
    if (!lastname) {
        return false;
    }
    else {
        if (lastname.lenght > 35) {
            return false;
        }
        return true;
    }
};

let validLastName = (lastname) => {
    if (!lasttname) {
        return false;
    }
    else {
        return (/^[a-zA-Z ]+$/).test(lastname);
    }
}

const lastnameValidators = [{ validator: lastnameLenghtChecker, message: "Last name no more than 30 characters" },
{ validator: validLastName, message: "Last name must not have number or special character" }];

/**
 * Validate Password
 * 
 */
let passwordLenghtChecker = (password) => {
    if (!password) {
        return false;
    }
    else {
        if (password.length < 8 || password.length > 32) {
            return false;
        }
        return true;
    }
};

let validPassword = (password) => {
    if (!password) {
        return false;
    }
    else {
        const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,32}$/);
        return regExp.test(password);
    }
};
const passwordValidators = [
    { validator: passwordLenghtChecker, message: "Password must be at least 8 but not more than 32 characters" },
    { validator: validPassword, message: "Password have at least one upcase, lowercase, special character and number" }];

/**
 * 
 */

var UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
        firstname: { type: String, validate: firstnameValidators, required: true },
        lastname: { type: String, required: true },
        password: { type: String, required: true, validate: passwordValidators },
        birthday: { type: Date, default: null },
        gender: { type: String, default: null },

        role:{type:String,
             enum:['user','admin'],
            default:'user'},
        active:{type:Boolean,required:true,default:false},
        temporarytoken: { type: String, required: true },
        resettoken:{type:String,required:false},
        avatar: {type: String, default: "sample.jpg"}
    });
/**
 * Encode password before save on database
 */
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});



UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
  };

module.exports = mongoose.model('User', UserSchema);