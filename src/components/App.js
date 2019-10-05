import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CreateLink from "../components/Link/CreateLink";
import SearchLinks from "../components/Link/SearchLinks";
import LinkList from "../components/Link/LinkList";
import LinkDetail from "../components/Link/LinkDetail";
import Login from "../components/Auth/Login";
import ForgotPassword from "../components/Auth/ForgotPassword";
import Header from "../components/Header";
import useAuth from "./Auth/useAuth";
import firebase, { FirebaseContext } from "../firebase/";

function App() {
  const user = useAuth();
  return (
    <Router>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/new/1" />} />
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={SearchLinks} />
              <Route path="/top" component={LinkList} />
              <Route path="/new/:page" component={LinkList} />
              <Route path="/link/:linkId" component={LinkDetail} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
