import React from "react";

import Profile from "./components/profile/profile.component";

import "./assets/styles/main.scss";

const App = () => {
  return (
    <div>
      <h1>rating.io</h1>
      <Profile region="us" realm="tichondrius" name="danzworth" />
    </div>
  );
};

export default App;
