import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function EventPage() {
  const { events } = useLoaderData(); // Object destructuring from defer fun.

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return {Error:true, Message:'Couldn't fetch events'}

    // throw new Response(
    //   JSON.stringify({
    //     title: "fetch failed",
    //     message: "something wrong with data fetching",
    //   }),
    // {
    //   status: 500,
    // }
    throw json(
      //loader will render the closest errorElement
      { title: "fetch failed", message: "something wrong with data fetching" },
      { status: 500 }
    );
  } else {
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
