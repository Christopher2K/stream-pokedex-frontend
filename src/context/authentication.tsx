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
  idToken: string | undefined;
  setUser: Dispatch<SetStateAction<Model.AuthenticatedUser | undefined>>;
  setIdToken: Dispatch<SetStateAction<string | undefined>>;
  loadingInitialAuth: boolean;
};

const AuthenticationContext = createContext<AuthenticationContextData | null>(
  null
);

export const AuthenticationContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Model.AuthenticatedUser | undefined>(
    undefined
  );
  const [idToken, setIdToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const unsub = firebase.auth().onAuthStateChanged((user) => {
        if (user == null) {
          setLoading(false);
        } else {
          user
            .getIdToken()
            .then((idToken) => {
              setIdToken(idToken);
              return idToken;
            })
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
        idToken,
        setUser,
        setIdToken,
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
