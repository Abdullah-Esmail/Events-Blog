import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const data = useRouteLoaderData("detail-data-id");
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>EditEventPage</h2>
      </div>
      <EventForm event={data.event} method="patch" />
    </>
  );
}

export default EditEventPage;
