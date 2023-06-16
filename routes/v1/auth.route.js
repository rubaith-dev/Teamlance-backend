const { Router } = require("express");
const { validateReq, validateAuth } = require("../../middlewares");
const { authDto} = require("../../dto/auth.dto");
const {signIn, signUp, isAuthenticated} = require("../../controllers/v1/auth.controller")


const authRoute = Router();

// sign up route
authRoute.post("/signup", validateReq(authDto), signUp);

// sign in route
authRoute.post("/signin", validateReq(authDto), signIn);

// check session
authRoute.get("/isAuthenticated",validateAuth, isAuthenticated )

module.exports = authRoute;
