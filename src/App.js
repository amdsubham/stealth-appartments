import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import ApartmentInTable from "./ApartmentInTable";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Menu from "./Menu";
import SendFCM from "./SendFCM";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Menu} />
          <Route exact path="/apartmentGallary" component={Home} />
          <Route exact path="/manageEvents" component={SendFCM} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/apartmentInTable" component={ApartmentInTable} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
