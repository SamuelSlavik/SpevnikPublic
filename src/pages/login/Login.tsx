import React from "react";
import {useEffect, useState, useContext} from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";

function Login(): JSX.Element {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [captcha, setCaptcha] = useState<string>("")

  const { userData, setUserData } = useContext(UserContext);

  const submit = async (e:any) => {
    if (parseInt(captcha) == 42) {
      e.preventDefault();
      try {
        const loginRes = await Axios.post(
          "http://spevnik.jakubcata.eu/api/login",
          {name, password}
        );
        setUserData({
          token: loginRes.data.token,
          name: loginRes.data.name,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const logOut = () => {
    setUserData({
      token: undefined,
      user: null,
    });
    localStorage.setItem("auth-token", "");
  }

  return (
    <div className={"content"}>
      <>
        {console.log(userData)}
      </>
      {userData.name ? <p>logged in </p> : <>nope</>}
      <form
        className={"login"}
        autoComplete="new-password"
        onSubmit={submit}
      >
        <input
          id={"loginName"}
          className={"input"}
          type={"text"}
          name={"login-name"}
          placeholder={"Name"}
          value={name}
          onChange={(event)=>(setName(event.target.value))}
        />
        <input
          id={"loginPassword"}
          className={"input"}
          type={"password"}
          name={"login-password"}
          placeholder={"Password"}
          value={password}
          onChange={(event)=>(setPassword(event.target.value))}
        />
        <input
          id={"loginCaptcha"}
          className={"input"}
          name={"login-captcha"}
          type={"text"}
          placeholder={"27 + 15 = "}
          value={captcha}
          onChange={(event) => (setCaptcha(event.target.value))}
        />
        <input
          id={"loginSubmit"}
          className={"submit"}
          name={"login-submit"}
          type={"submit"}
          value={"Log in"}
        />
      </form>

      <a onClick={logOut}>Log Out</a>
    </div>
  )
}

export default Login