import firebase from "firebase/app";
import "firebase/auth";
import { API_ROOT } from "settings";
import { SignupFormData } from "components/SignupForm";
import { LoginFormData } from "components/LoginForm";

export async function signup(formData: SignupFormData) {
  const url = `${API_ROOT}/auth/signup`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: new Headers({
      "Context-Type": "application/json",
    }),
  });

  if (response.status === 200) {
    return;
  } else if (response.status === 400) {
    throw new Error("This username/email already exists in our database");
  } else if (response.status === 500) {
    throw new Error("Server error, try again later.");
  }
}

export async function login(
  formData: LoginFormData
): Promise<{ user: Model.AuthenticatedUser; idToken: string }> {
  const defaultError = new Error("Cannot sign in right now.");

  try {
    const credentials = await firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password);

    if (!credentials.user) {
      throw defaultError;
    }

    const idToken = await credentials.user.getIdToken();
    const profile = await getProfile(idToken);

    return {
      idToken,
      user: {
        firebaseId: credentials.user.uid,
        ...profile,
      },
    };
  } catch (e) {
    if (e.code) {
      switch (e.code) {
        case "auth/wrong-password":
        case "auth/user-not-found":
          throw new Error("User not found");
        default:
          console.error(e);
          throw defaultError;
      }
    } else {
      console.error(e);
      throw defaultError;
    }
  }
}

export async function getProfile(idToken: string): Promise<Model.UserProfile> {
  const url = `${API_ROOT}/auth/profile`;

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Context-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    }),
  });

  const data = await response.json();
  return data;
}

export async function logout(): Promise<void> {
  await firebase.auth().signOut();
}
