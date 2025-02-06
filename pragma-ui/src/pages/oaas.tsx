import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import WalletConnection from "../components/common/WalletConnection";

const OaasPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState(null);

  useEffect(() => {
    // Check local storage for login status and method
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedLoginMethod = localStorage.getItem("loginMethod");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      setLoginMethod(storedLoginMethod);
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    setIsLoggedIn(true);
    setLoginMethod("google");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginMethod", "google");
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  const handleDisconnect = () => {
    setIsLoggedIn(false);
    setLoginMethod(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginMethod");
    console.log("Disconnected");
  };

  return (
    <GoogleOAuthProvider clientId="493446366695-u34o4hmm4o4oth63i5cv6riu5fekc3k7.apps.googleusercontent.com">
      <div
        className={classNames(
          "relative w-full overflow-x-hidden",
          styles.bigScreen
        )}
      >
        <BoxContainer>
          <div className="flex h-screen w-full flex-col items-center justify-center">
            <h1 className="w-full text-center text-lightGreen">
              Launch your oracle
            </h1>
            <div className="flex flex-col items-center justify-center p-4 pt-10 md:flex-row">
              {!isLoggedIn ? (
                <>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                  />
                  <WalletConnection
                    onSuccess={() => {
                      setIsLoggedIn(true);
                      setLoginMethod("starknet");
                      localStorage.setItem("isLoggedIn", "true");
                      localStorage.setItem("loginMethod", "starknet");
                    }}
                  />
                </>
              ) : (
                <div>
                  <p>User is connected via {loginMethod}</p>
                  <button onClick={handleDisconnect} className="mt-4">
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
        </BoxContainer>
      </div>
    </GoogleOAuthProvider>
  );
};

export default OaasPage;
