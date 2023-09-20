import e from "express";
import { loginUser, registerUser, getAllUser } from "../controller/UserController.js";

const route = e.Router();

route.get('/all', getAllUser);
route.post('/register' , registerUser);
route.post('/login' , loginUser);

// route.get('/user', isAuthenticated , getAllUser);
// route.get('/user', isAuthenticated , getAllUser);
// route.post('/sendMail', isAuthenticated , sendMail);

export default route;