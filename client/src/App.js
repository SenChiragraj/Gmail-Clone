import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./components/Errors/ErrorPage";
import Inbox from "./components/Emails/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/inbox"} />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="inbox" element={<Inbox />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
