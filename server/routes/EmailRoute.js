import e from "express"
import { getAllMail, getArchiveMail, getDeletedMail, getStarredMail, getSentMail, addNewMail, getAllMailsOfUser, changeMailType } from "../controller/MailController.js";
// import { isAuthenticated } from "../middleware/IsAuthenticated.js";
import isAuthenticated from '../middleware/IsAuthenticated.js'

const route = e.Router();

route.get('/all', isAuthenticated, getAllMail);
route.get('/inbox', isAuthenticated, getAllMailsOfUser);
route.post('/new', isAuthenticated, addNewMail);
route.put("/:type/:id", isAuthenticated, changeMailType);
// route.get('/archive', isAuthenticated, getArchiveMail);
// route.get('/starred', isAuthenticated, getStarredMail);
// route.get('/deleted', isAuthenticated, getDeletedMail);
// route.get('/sent', isAuthenticated, getSentMail);

export default route;