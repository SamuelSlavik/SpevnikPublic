import React, {useState, useEffect, useContext} from "react";
import {NavLink, Link} from "react-router-dom";
import css from "*.scss";
import UserContext from "../context/userContext";

import {toggleSidePanelOn} from "../functions/toggleSidePanel";

// images
import logo from "../assets/images/logo.svg"

function Navigation(): JSX.Element {
  const navigationToggleOn = () => {
    document.getElementById("navigation-content--responsive")!.style.display = "block";
    document.getElementById("hamburger")!.style.display = "none";
    document.getElementById("cross")!.style.display = "block";
  }
  const navigationToggleOf = () => {
    document.getElementById("navigation-content--responsive")!.style.display = "none";
    document.getElementById("hamburger")!.style.display = "block";
    document.getElementById("cross")!.style.display = "none";
  }

  const { isHomepage, setIsHomepage } = useContext(UserContext);

  return (
    <>
      <div className={"navigation-wrapper"}>
        <div className={"navigation--border"}>
          <div className={"logo"}>
            <Link to={"/"}>
              <img alt={"logo"} src={logo}/>
            </Link>
          </div>


          <div className={"navigation"}>
            {
              isHomepage.is ?
                <a onClick={toggleSidePanelOn} >
                  <i className="fa  fa-search" aria-hidden="true"></i>
                </a> :
                <></>
            }
            <a>
              <i className="fa fa-gear" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      {/**********************RESPONSIVE NAVIGATION ************************/}
      <div className={"navigation--responsive"}>
        <div className={"navigation--responsive__top"}>
          <div className={"logo-wrapper--responsive"}>
            <Link to={"/"}>
              <img className={"logo--responsive"} alt={"logo"} src={logo}/>
            </Link>
          </div>
          <div className={"hamburger"} id={"hamburger"}>
            <a onClick={navigationToggleOn}>
              <i className="fa fa-2x fa-bars" aria-hidden="true"></i>
            </a>
          </div>
          <div className={"cross"} id={"cross"}>
            <a onClick={navigationToggleOf}>
              <i className="fa fa-2x fa-times" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className={"navigation-content--responsive"} id={"navigation-content--responsive"}>
          <NavLink to={"/"} onClick={navigationToggleOf}>Aktuálně</NavLink>
          <NavLink to={"/about"} onClick={navigationToggleOf}>O Wydrách</NavLink>
          <NavLink to={"/information"} onClick={navigationToggleOf}>Pre členov</NavLink>
          <NavLink to={"/gallery"} onClick={navigationToggleOf}>Galéria</NavLink>
          <NavLink to={"/contact"} onClick={navigationToggleOf}>Kontakt</NavLink>
        </div>
      </div>
    </>
  )
}

export default Navigation