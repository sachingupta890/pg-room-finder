const express = require("express");
const router = express.Router();

// get the conntoller for the router

// const loginBtn = document.getElementById("btn-login");
// loginBtn.addEventListener("click", () => {
//     console.log("Clicked")
// });

//get the middlewares controllers 
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

const { signup, login } = require("../controllers/Auth");

router.post("/login", login);

router.post("/signup", signup);


// routes for the student portal and admin portal and simple authentication route

//route for only authentication

router.get("/test", auth, (req,res) => {
    res.status(200).json({
        success: true,
        message:'you are a authorised user',
    })
})


//route for authorization for student 
router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message:'welcome to the student portal ',
    })
})
//route for authorization for admin 
router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message:'welcome to the Admin portal ',
    })
})

module.exports = router;