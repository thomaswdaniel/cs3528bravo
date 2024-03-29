import React from 'react';
import { UserProvider } from "./contexts/user.context";
import { BrowserRouter } from 'react-router-dom';

// import axios from 'axios';
import "./index.css";
import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";

import Navbar from "./pages/Navbar.page";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import Events from "./pages/Events.page";
import CreateEvent from "./pages/CreateEvent.page";
import MyEvents from "./pages/MyEvents.page";
import Footer from "./pages/Footer.page";
import Help from "./pages/Help.page";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      < Navbar />
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/help" element={<Help />} />
          {/* We are protecting the create event and event page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/createevent" element={<CreateEvent/> } />
            <Route exact path="/my-events" element={<MyEvents />} />
          </Route>
        </Routes>
      </UserProvider>
      <Footer />
    </BrowserRouter>
  );
 }
 
export default App;