// utils/validate.js
const validator = require('validator');

const validateData = (req) => {
    const { name, email, password } = req.body;

    if (!name) {
        throw new Error("Please Enter Your Name");
    }
    if (!email) {
        throw new Error("Please Enter an Email Address");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Please Enter a Valid Email Address");
    }
    if (!password) {
        throw new Error("Please Enter a Password");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter a Strong Password");
    }
};

module.exports = validateData;
