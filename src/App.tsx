import React,{ useState, useEffect, } from "react";
import {Route, Routes} from "react-router";
import Axios from "axios";

import UserContext from "./context/userContext";
import SearchContext from "./context/searchContext";

import {toggleSidePanelOff} from "./functions/toggleSidePanel";

import Homepage from "./pages/homepage/Homepage";
import Navigation from "./components/Navigation";
import Login from "./pages/login/Login";

function App() {
  // ALL THE CONTEXT
  const [userData, setUserData] = useState({
    token: undefined,
    name: undefined,
  });
  const [isHomepage, setIsHomepage] = useState({
    is: false
  });
  const [searchString, setSearchString] = useState<string>("")
  const [searchTags, setSearchTags] = useState<number[]>([])
  /*useEffect(()=>{
    const checkLoggedIn = async () => {
      let token:any = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          name: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);*/

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData, isHomepage, setIsHomepage, }}>
        <SearchContext.Provider value={{searchString, setSearchString, searchTags, setSearchTags}}>
          <Navigation/>
          <Routes>
            <Route
              path={"/"}
              element={<Homepage />}
            />
            <Route
              path={"/login"}
              element={<Login />}
            />
          </Routes>
        </SearchContext.Provider>
      </UserContext.Provider>
      <div
        className={"sidepanel__overlay"}
        id={"sidePanelOverlay"}
        onClick={toggleSidePanelOff}
      ></div>
    </div>
  );
}

export default App;
