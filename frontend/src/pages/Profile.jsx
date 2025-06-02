import React, { useContext, useEffect, useState } from "react";

import{AuthContext} from "../context/AuthProvider";
import axios from "axios";

const Profile = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  const { user, dispatch } = useContext(AuthContext);
  const [userName, setUsername] = useState();

  axios.defaults.headers.common["Authorization"] = user;

  const getUserProfile = async () => {
    await axios
      .get("http://localhost:3001/profile")
      .then((res) => {
        setUsername(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      Hi, {userName && userName}
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
