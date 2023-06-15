const { Router } = require("express");
const { validateReq } = require("../../middlewares");
const { signInDto, signUpDto } = require("../../dto/auth.dto");
const {signIn, signUp} = require("../../controllers/v1/auth.controller")

const authRoute = Router();

// sign up route
authRoute.post("/signup", validateReq(signUpDto), signUp);

// sign in route
authRoute.post("/signin", validateReq(signInDto), signIn);

module.exports = authRoute;
