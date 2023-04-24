import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const inputRef = useRef();
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  useEffect(() => {
    if (state === "idle" && data && data.message) {
      inputRef.current.value = "";
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    <fetcher.Form
      method="post"
      className={classes.newsletter}
      action="/newsletter"
    >
      <input
        type="email"
        placeholder="Sign up..."
        aria-label="Sign up"
        className="m-input"
        ref={inputRef}
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
