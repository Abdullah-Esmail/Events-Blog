import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import getAuthToken from "../components/Util/Auth";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("detail-data-id");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

//load all events
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return {Error:true, Message:'Couldn\'t fetch events'}

    // throw new Response(
    //   JSON.stringify({
    //     title: "fetch failed",
    //     message: "something wrong with data fetching",
    //   }),
    // {
    //   status: 500,
    // }throw json is better =>(look at error page)
    throw json(
      { title: "fetch failed", message: "something wrong with data fetching" },
      { status: 500 }
    );
    // ); //loader will render the closest errorElement
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

//load the needed event
async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected events" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

//this is the function which will load our events
export async function loader({ request, params }) {
  const id = params.eventID;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

//delete action
export async function action({ params, request }) {
  const token = getAuthToken();
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventID,
    {
      method: request.method,
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 });
  } else {
    return redirect("/events");
  }
}
