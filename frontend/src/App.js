import React from "react";
import "./App.css";
import Main from "./screens/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const App = () => {
  const token = useSelector(state => state.token);

  return (
    <Router>
      <Route path="/" exact>
        {token !== null ? <Redirect to="/todos" /> : <Login />}
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/todos">
        {token === null ? <Redirect to="/" /> : <Main />}
      </Route>
    </Router>
  );
};

export default App;
