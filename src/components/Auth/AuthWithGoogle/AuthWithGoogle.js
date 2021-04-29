import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/auth-context";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";

import "./AuthWithGoogle.css";
import { Button } from "react-bootstrap";

const AuthWithGoogle = () => {
  const [authSuccess, setAuthSuccess] = useState(false);
  const authContext = useContext(AuthContext);

  const history = useHistory();
  const tokenFromParams = window.location.href.split("&")[1].split("=")[1];

  useEffect(() => {
    if (tokenFromParams) {
      setAuthSuccess(true);
      document.cookie =
        "access_token=" + tokenFromParams + "; max-age=3600; path=/; secure";
    }
  }, [tokenFromParams]);

  const loginWithGoogleInFirebase = () => {
    const callback = () => {
      const getCookie = (name) => {
        let matches = document.cookie.match(
          new RegExp(
            "(?:^|; )" +
              name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
              "=([^;]*)"
          )
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
      };
      const id = getCookie("localId");
      history.push(`/auth/profile/${id}`);
    };

    authContext.signInWithGoogle(callback);
  };

  const backToAuth = () => {
    history.push("/auth");
  };

  const welcomeAndRedirect = (
    <div className="google-auth-message">
      <p>구글 인증이 완료되었습니다. 구글 아이디로 로그인 하시겠습니까?</p>
      <Button onClick={loginWithGoogleInFirebase}>로그인</Button>
    </div>
  );

  const noAccessTokenRedirect = (
    <div className="google-auth-message">
      <p>구글 인증에 실패했습니다.</p>
      <Button onClick={backToAuth}>로그인 창으로 돌아가기</Button>
    </div>
  );

  return (
    <Container className="google-auth-message-container">
      {authSuccess ? welcomeAndRedirect : noAccessTokenRedirect}
    </Container>
  );
};

export default AuthWithGoogle;
