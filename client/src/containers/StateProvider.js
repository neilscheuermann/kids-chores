import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import { refreshSocket } from "../util/apollo";
import { AuthContext } from "../util/context";

const StateProvider = ({
  initialCurrentUserToken,
  initialCurrentUserId,
  initialToken,
  initialAccountOwnerId,
  socket,
  children,
}) => {
  const client = useApolloClient();
  const [token, setToken] = useState(initialToken || Cookies.get("token"));
  const [accountOwnerId, setAccountOwnerId] = useState(
    initialAccountOwnerId || Cookies.get("accountOwnerId")
  );
  const [currentUserToken, setCurrentUserToken] = useState(
    initialCurrentUserToken || Cookies.get("currentUserToken")
  );
  const [currentUserId, setCurrentUserId] = useState(
    initialCurrentUserId || Cookies.get("currentUserId")
  );

  // If the token changed (i.e. the user logged in
  // or out), clear the Apollo store and refresh the
  // websocket connection.
  useEffect(() => {
    if (!token) client.clearStore();
    if (socket) refreshSocket(socket);
  }, [client, socket, token]);

  const setAuth = (data) => {
    if (data) {
      const { id, token, currentUserToken, currentUserId } = data;
      if (currentUserToken && currentUserId) {
        if (currentUserToken === "logout" || currentUserId === "logout") {
          Cookies.remove("currentUserToken", currentUserToken);
          Cookies.remove("currentUserId", currentUserId);
          setCurrentUserToken(null);
          setCurrentUserId(null);
        } else {
          Cookies.set("currentUserToken", currentUserToken);
          Cookies.set("currentUserId", currentUserId);
          setCurrentUserToken(currentUserToken);
          setCurrentUserId(currentUserId);
        }
      }
      if (id && token) {
        Cookies.set("token", token);
        Cookies.set("accountOwnerId", id);
        setToken(token);
        setAccountOwnerId(id);
      }
    } else {
      // Clear and reset all cookies if setAuth(null) or setAuth()
      Cookies.remove("token");
      Cookies.remove("accountOwnerId");
      Cookies.remove("currentUserToken");
      Cookies.remove("currentUserId");
      setToken(null);
      setAccountOwnerId(null);
      setCurrentUserToken(null);
      setCurrentUserId(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        accountOwnerId,
        currentUserToken,
        currentUserId,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default StateProvider;
