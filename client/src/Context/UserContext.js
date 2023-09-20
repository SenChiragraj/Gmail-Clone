import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate as an element
import { getMails } from "../middleware/Requests";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [mails, setMail] = useState([]);
  const [openMail, setOpenMail] = useState({});
  const [mailType, setMailType] = useState('inbox');
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      const userInfo = JSON.parse(localStorage.getItem("token"));
      // console.log(userInfo);
      if (userInfo) {
        setCurrUser(userInfo);
        navigate("/inbox");
      } else navigate("/login");
    })();
  }, [navigate]); // Removed Navigate from the dependency array

  // useEffect(() => {
  //   ()();
  // }, [mailType]);

  return (
    <UserContext.Provider
      value={{
        currUser,
        setCurrUser,
        openMail,
        setOpenMail,
        mails,
        setMail,
        mailType,
        setMailType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
