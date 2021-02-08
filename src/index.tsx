import firebase from "firebase/app";
import { FC } from "react";
import { render } from "react-dom";
import { Global } from "@emotion/react";

import { Router } from "router";
import { reset } from "style/reset";
import { root } from "style/root";
import { AuthenticationContextProvider } from "context/authentication";

var firebaseConfig = {
  apiKey: "AIzaSyAVWVeUhdk24caKi6QS3a2EabC3u7by4dk",
  authDomain: "stream-pokedex.firebaseapp.com",
  projectId: "stream-pokedex",
  storageBucket: "stream-pokedex.appspot.com",
  messagingSenderId: "69994028696",
  appId: "1:69994028696:web:f110cc07adb621d6e3baed",
};

firebase.initializeApp(firebaseConfig);

export const App: FC = () => (
  <div>
    <AuthenticationContextProvider>
      <Global styles={root} />
      <Global styles={reset} />
      <Router />
    </AuthenticationContextProvider>
  </div>
);

render(<App />, document.getElementById("root"));
