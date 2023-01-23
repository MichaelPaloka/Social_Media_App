const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Based on learn Platform model for users, and who to bcrypt passwords, and validate emails. 


const UserSchema = new mongoose.Schema({
    handle: { 
        type: String,
        required: [
            true,
            "A handle is required!"
        ],
        minlength: [2, "First name must be longer than 2 characters!"]
    },
    firstName: { 
        type: String,
        required: [
            true,
            "A first name is required!"
        ],
        minlength: [2, "First name must be longer than 2 characters!"]
    },
    lastName: { 
        type: String,
        required: [
            true,
            "A last name is required!"
        ],
        minlength: [2, "Last name must be longer than 2 characters!"]
    },
    email: { 
        type: String,
        required: [
            true,
            "An email is required!"
        ],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: { 
        type: String,
        required: [
            true,
            "A password is required!"
        ],
    },
    follower: [{
        type: [],
        required: [
            false,
        ]
    }],
    following: [{
        type: [],
        required: [
            false,
        ]
    }],
    Notification: [{
        type: [],
        required: [
            false,
        ]
    }],
    

}, { timestamps: true });


UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( (value) => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
    });

module.exports = mongoose.model('User', UserSchema);