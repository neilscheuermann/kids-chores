import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import { refreshSocket } from "../util/apollo";
import { AuthContext } from "../util/context";

const StateProvider = ({
  initialToken,
  initialCurrentUserToken,
  initialAccountOwnerId,
  socket,
  children,
}) => {
  const client = useApolloClient();
  const [token, setToken] = useState(initialToken || Cookies.get("token"));
  const [currentUserToken, setCurrentUserToken] = useState(
    initialCurrentUserToken || Cookies.get("currentUserToken")
  );
  const [accountOwnerId, setUserId] = useState(
    initialAccountOwnerId || Cookies.get("accountOwnerId")
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
      const { id, token, currentUserToken } = data;
      if (currentUserToken) {
        Cookies.set("currentUserToken", currentUserToken);
      }
      if (id && token) {
        Cookies.set("token", token);
        Cookies.set("accountOwnerId", id);
        setToken(token);
        setUserId(id);
      }
    } else {
      Cookies.remove("token");
      Cookies.remove("currentUserToken");
      Cookies.remove("accountOwnerId");
      setToken(null);
      setUserId(null);
      setCurrentUserToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, accountOwnerId, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default StateProvider;
