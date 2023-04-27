const {check,body}=require('express-validator');
const model=require('../models');
const User=model.User;


exports.registerValidation =[
    body("first_name").not().isEmpty().withMessage("firstname required"),
    body("password").isLength({min:5}).withMessage("must be 5 characters"),
    body("email").isEmail().withMessage("the email is not valid")
]


exports.loginvalidation=[check('email').not().isEmpty().withMessage("email is required"),check("password").not().isEmpty().withMessage("the password is required")]
