import React, { useEffect } from "react";

import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from './helpers/setAuthToken';
import './App.css';

// run setAuthToken
if (localStorage.token)
{
  setAuthToken(localStorage.token);
}
//to run once an mount or unmount pass array as the 2nd parameter
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (

    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          







          <Routes>
            <Route exact path='/' component={Home} />

            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/login' element={<Login />}></Route>

          </Routes>

        </div>
      </Router>
    </Provider>










  );
}
export default App;




