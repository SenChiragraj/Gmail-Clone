import Inbox from "../components/Emails/Inbox";
import Home from "../pages/Home";

const routes = [{
  main : { path : '/', element : Home},
  emails : { path : '/inbox', element : Inbox},
  invalid : { path : '/*', element : Inbox},
  // main : { path : '/', element : },
}]