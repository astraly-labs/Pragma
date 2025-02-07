import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import BoxContainer from "../components/common/BoxContainer";
import classNames from "classnames";
import BasicHero from "../components/Ecosystem/BasicHero";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import WalletConnection from "../components/common/WalletConnection";
import { useRouter } from "next/router";

const OaasPage = () => {
  const router = useRouter();
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

  const handleLaunchOracle = () => {
    router.push("/oracle/new");
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
            <div className="flex flex-col items-center justify-center gap-4 pt-10 md:flex-row">
              {!isLoggedIn ? (
                <>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                  />
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleLaunchOracle}
                    className="rounded-full bg-mint px-4 py-2 text-darkGreen"
                  >
                    Launch your oracle
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="mt-4 rounded-full border border-mint px-4 py-2 text-mint"
                  >
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
