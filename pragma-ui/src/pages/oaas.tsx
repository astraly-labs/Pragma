import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import V2Hero from "../components/v2/v2Hero";
import { Button } from "../components/common/Button";
import axios from "axios";

const OaasPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check local storage for login status and method
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const storedLoginMethod = localStorage.getItem("loginMethod");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      setLoginMethod(storedLoginMethod);
    }
  }, []);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Exchange Google token for our API JWT
      const response = await axios.post('/api/auth/token', {
        credential: credentialResponse.credential
      });

      if (response.data?.token) {
        setIsLoggedIn(true);
        setLoginMethod("google");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginMethod", "google");
        localStorage.setItem("apiToken", response.data.token);
        setError("");
      }
    } catch (err) {
      console.error("Login Failed:", err);
      setError(err.response?.data?.error || "Failed to login");
      setIsLoggedIn(false);
    }
  };

  const handleLoginError = () => {
    console.error("Login Failed");
    setError("Failed to login with Google");
  };

  const handleDisconnect = () => {
    setIsLoggedIn(false);
    setLoginMethod(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("apiToken");
    setError("");
    console.log("Disconnected");
  };

  const handleLaunchOracle = () => {
    router.push("/oracle/new");
  };

  return (
    <GoogleOAuthProvider clientId="559183025008-25hfk1gn99qkb2g4uml5e3kesf603314.apps.googleusercontent.com">
      <div
        className={classNames(
          "relative w-full overflow-x-hidden",
          styles.bigScreen
        )}
      >
        <V2Hero
          title={"Launch your"}
          purpleTitle={"oracle"}
          description={
            "Permissionlessly launch your feed, in minutes. Jump in now."
          }
          solidButton={"Read docs"}
          solidButtonLink={"https://docs.pragma.build/"}
          illustrationLink={"/assets/vectors/Nodes.svg"}
          customButton={
            <div className="flex flex-col items-center justify-center gap-4 pt-10 md:flex-row">
              {!isLoggedIn ? (
                <>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                  />
                  {error && <div className="text-sm text-red-500">{error}</div>}
                </>
              ) : (
                <div className="flex flex-col">
                  <Button
                    onClick={handleLaunchOracle}
                    className="rounded-full bg-mint px-4 py-2 text-darkGreen"
                    variant="solid"
                    color="mint"
                    center={true}
                  >
                    Launch your oracle
                  </Button>
                  <Button
                    onClick={handleDisconnect}
                    className="mt-4 rounded-full border border-mint px-4 py-2 text-mint"
                    variant="outline"
                    color="mint"
                    center={true}
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          }
        ></V2Hero>
      </div>
    </GoogleOAuthProvider>
  );
};

export default OaasPage;
