import React, {useContext} from "react";
import {useEffect, useState} from "react";
import SongsList from "./SongsList";
import {HomepageProps} from "../../types/interfaces";
import SidePanel from "../../components/SidePanel";
import UserContext from "../../context/userContext";


function Homepage({category}: HomepageProps): JSX.Element {
  const { isHomepage, setIsHomepage } = useContext(UserContext);

  useEffect(() => {
    setIsHomepage({is: true})
    return () => {
      setIsHomepage({is: false})
    }
  },[])

  return (
    <div className={"content"}>
      <SidePanel />
      <SongsList />
    </div>
  )
}

export default Homepage