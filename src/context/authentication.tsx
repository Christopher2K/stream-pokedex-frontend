import firebase from "firebase/app";
import "firebase/auth";
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "services/authentication";

type AuthenticationContextData = {
  user: Model.AuthenticatedUser | undefined;
  setUser: Dispatch<SetStateAction<Model.AuthenticatedUser | undefined>>;
  loadingInitialAuth: boolean;
};

const AuthenticationContext = createContext<AuthenticationContextData | null>(
  null
);

export const AuthenticationContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Model.AuthenticatedUser | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const unsub = firebase.auth().onAuthStateChanged((user) => {
        if (user == null) {
          setLoading(false);
        } else {
          user
            .getIdToken()
            .then(getProfile)
            .then((profile) => {
              setUser({
                firebaseId: user.uid,
                ...profile,
              });
              setLoading(false);
            });
        }
        unsub();
      });
    }
  }, [loading]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        loadingInitialAuth: loading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuthentication(): AuthenticationContextData {
  const ctx = useContext(AuthenticationContext);
  if (ctx == null) {
    throw new Error("Must be inside <AuthenticationContextProvider>");
  }

  return ctx;
}
