import React, { useRef } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createClient } from "./util/apollo";
import StateProvider from "./containers/StateProvider";
// import { Meta, Nav } from "components";
import "./App.css";
import { Chores, Login } from "./pages";

function App() {
  const client = useRef(createClient());

  return (
    <ApolloProvider client={client.current}>
      <BrowserRouter>
        <StateProvider>
          {/* <Meta /> */}
          {/* <Nav /> */}

          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route component={Chores} />
          </Switch>
        </StateProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
