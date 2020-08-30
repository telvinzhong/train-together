import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Home from './Home';
import Landing from './Landing';
import Onboarding from './onboarding';

const Main = () => {
  const { isAuthenticated } = useAuth0();
  const isNew = true;

  if (isAuthenticated) {
    if (isNew) {
      return <Onboarding />;
    }
    return <Home />;
  }
  return <Landing />;
};

export default Main;