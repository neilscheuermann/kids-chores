import React, { useRef } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createClient } from "./util/apollo";
import StateProvider from "./containers/StateProvider";
import { Nav } from "./components";
import "./App.css";
import { Chores, Users, UserLogin, User, Home, Login } from "./pages";

function App() {
  const client = useRef(createClient());

  return (
    <ApolloProvider client={client.current}>
      <BrowserRouter>
        <StateProvider>
          <Nav />

          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/users" component={Users}></Route>
            <Route path="/user-login/:id" component={UserLogin}></Route>
            <Route path="/user/:id" component={User}></Route>
            <Route path="/chores" component={Chores}></Route>
            <Route component={Home} />
          </Switch>
        </StateProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
