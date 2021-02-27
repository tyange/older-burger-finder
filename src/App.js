import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import BurgerContextProvider from "./context/burger-context";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout/Layout";
import Burger from "./components/Burger/Burger";

function App() {
  let routes = (
    <Switch>
      <BurgerContextProvider>
        <Route path="/" component={Burger} exact />
      </BurgerContextProvider>
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
