import { redirect } from "react-router-dom";

function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}
export default getAuthToken;

//export it as a loader
export function authLoader() {
  return getAuthToken();
}

//check auth before opening the page
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }

  //else return nothing
  return null;
}
