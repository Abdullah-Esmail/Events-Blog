import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

//send data to be authenticated
export async function action({ request }) {
  //getting mode
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  //prepare data to send
  const data = await request.formData(); // data from form.
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  //send Data
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);

  return redirect("/");
}

export function logoutAction() {
  localStorage.removeItem("token");
  return redirect("/auth?mode=login");
}
