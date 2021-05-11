import { useState } from "react";
import { useHistory } from "react-router";

import axios from "axios";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const history = useHistory();

  const authWithEmailAndPassword = async (email, password, authMode) => {
    setIsLoading(true);
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url;

    if (authMode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    } else if (authMode === "login") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    }

    try {
      const response = await axios.post(url, authData);
      const responseData = await response.data;

      if (responseData && authMode === "signup") {
        console.log("signup success");
      } else if (responseData && authMode === "login") {
        try {
          const responseDataKeys = Object.keys(responseData);

          for (let key in responseDataKeys) {
            const name = responseDataKeys[key];
            localStorage.setItem(name, responseData[name]);
          }

          const getUserDataUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
          const tokenData = { idToken: responseData["idToken"] };
          const userDataResponse = await axios.post(getUserDataUrl, tokenData);
          const userData = await userDataResponse.data.users[0];

          console.log("login success.");
          setUserId(responseData["localId"]);
          setUserName(responseData["displayName"]);
          setIsVerified(userData["emailVerified"]);
          setIsAuth(true);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const signInToFirebase = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("access_token");

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    const authData = {
      postBody: `access_token=${accessToken}&providerId=google.com`,
      requestUri: "http://localhost:3000",
      returnIdpCredential: true,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(url, authData);
      const responseData = await response.data;

      if (responseData) {
        const responseDataKeys = Object.keys(responseData);

        for (let key in responseDataKeys) {
          const name = responseDataKeys[key];
          localStorage.setItem(name, responseData[name]);
        }
        setIsAuth(true);
        setUserId(responseData["localId"]);
        setUserName(responseData["displayName"]);
        setIsVerified(true);
        history.push("/");
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUserId(null);
    setUserName(null);
    setIsVerified(false);
    localStorage.clear();
    history.push("/");
  };

  return {
    isLoading,
    isAuth,
    userId,
    userName,
    isVerified,
    authWithEmailAndPassword,
    signInToFirebase,
    logout,
  };
};
