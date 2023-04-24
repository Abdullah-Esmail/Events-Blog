import { json, redirect } from "react-router-dom";
import getAuthToken from "./Util/Auth";

async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";
  if (request.method === "PATCH") {
    url = "http://localhost:8080/events/" + params.eventID;
  }
  const token = getAuthToken();
  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }
  return redirect("/events");
}

export default action;
