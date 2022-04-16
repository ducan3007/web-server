import express from "express";

import {signUp,signIn} from "../controllers/users.js";

const Auth = express.Router();

Auth.get('/signup',signUp) // api/signup
Auth.post('/signin',signIn)// api/signin


export default Auth;
