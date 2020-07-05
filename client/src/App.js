import React, { useRef } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createClient } from "./util/apollo";
// import { Meta, Nav } from "components";
import "./App.css";
import {
  Chores,
  // Chat, Home, Login, Post, Signup
} from "./pages";

function App() {
  const client = useRef(createClient());

  return (
    <ApolloProvider client={client.current}>
      <BrowserRouter>
        {/* <Meta /> */}
        {/* <Nav /> */}

        <Switch>
          {/* <Route path="/login" component={Login}></Route> */}
          {/* <Route path="/signup" component={Signup}></Route> */}
          {/* <Route path="/post/:id" component={Post}></Route> */}
          {/* <Route path="/chat/:id?" component={Chat}></Route> */}
          {/* <Route component={Home} /> */}
          <Route component={Chores} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
