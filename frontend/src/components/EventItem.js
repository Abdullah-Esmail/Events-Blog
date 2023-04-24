import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";
import getAuthToken from "./Util/Auth";
import "../My-Toolkit.css";

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const procced = window.confirm("Are you sure?");
    if (procced) {
      submit(null, { method: "delete" });
    }
  }
  const token = getAuthToken();
  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <button className="m-btn">
            {" "}
            <Link to="edit">Edit</Link>
          </button>
          <button onClick={startDeleteHandler} className="m-btn">
            Delete
          </button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
