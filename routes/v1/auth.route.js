const { Router } = require("express");
const { validateReq } = require("../../middlewares");
const { authDto} = require("../../dto/auth.dto");
const {signIn, signUp} = require("../../controllers/v1/auth.controller")

const authRoute = Router();

// sign up route
authRoute.post("/signup", validateReq(authDto), signUp);

// sign in route
authRoute.post("/signin", validateReq(authDto), signIn);

module.exports = authRoute;
