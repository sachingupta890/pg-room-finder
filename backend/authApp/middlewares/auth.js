// import jwt 
const jwt = require("jsonwebtoken");

//import the dotenv file as we will use secret key
require("dotenv").config();

//route handler for authentication
exports.auth = (req, res, next) => {
    try {
        
        //fetch the JWT token from req body 
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'token not found',
            });
        }
        
        //verify the token
        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET);  // this is decoded token as token is generally encrypted
            console.log(payload);

            req.user = payload;
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'not a valid user',
        });
    }
}

// route handler for isStudent

exports.isStudent = (req, res, next) => {
    try {

        if (req.user.role !== 'Student') {
            return res.status(401).json({
                sucess: false,
                message: 'this is protected route for student',
            });
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'cannot enter in protected route for student',
        });
    }
    next();
}

//route handler for isAdmin

exports.isAdmin = (req, res, next) => {
    try {

        if (req.user.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'this is protected route for Admin ',
            });
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'cannot enter in protected route for Admin',
        });
    }
    next();
}