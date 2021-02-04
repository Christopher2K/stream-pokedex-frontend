import { API_ROOT } from "settings";
import { SignupFormData } from "components/SignupForm";

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
